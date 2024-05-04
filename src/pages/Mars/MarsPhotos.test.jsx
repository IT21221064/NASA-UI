import { vi, describe, beforeAll, afterAll, it, expect } from "vitest";
import { render, act, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarsPhotos from "./MarsPhotos";

const mockedImplementation = (url) => {
  return Promise.resolve({
    json() {
      return {
        photos: [
          {
            id: "mocked_id",
            img_src: "mocked_img_src",
            earth_date: "mocked_earth_date",
            sol: "mocked_sol",
            camera: { name: "NAVCAM" },
          },
        ],
      };
    },
  });
};

describe("MarsPhotos Component", () => {
  let originalFetch;
  let fetchSpy;

  beforeAll(() => {
    originalFetch = global.fetch;
    global.fetch = vi.fn(mockedImplementation);
    fetchSpy = vi.spyOn(global, "fetch");
  });

  afterAll(() => {
    global.fetch = originalFetch;
    fetchSpy.mockRestore();
  });

  it("fetches data on mount", async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const FHAZ = "Front Hazard Avoidance Camera";

    render(
      <BrowserRouter>
        <MarsPhotos />
      </BrowserRouter>
    );

    // Manually set the selectedCamera state to FHAZ
    await act(async () => {
      const cameraSelect = screen.getByRole("combobox");
      fireEvent.change(cameraSelect, { target: { value: "FHAZ" } });
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2024-05-04&camera=FHAZ&api_key=k8Ge2bvALEcbfpJbov0OoOzF8ybEfycFbYEG0t40"
    );
  });
});
