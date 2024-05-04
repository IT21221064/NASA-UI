import { vi, describe, beforeAll, afterAll, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import InnovationList from "./InnovationList";

const mockedImplementation = () =>
  Promise.resolve({
    json() {
      return {
        url: "mocked_url",
        title: "mocked_title",
        date: "mocked_date",
        explanation: "mocked_explanation",
      };
    },
  });

describe("EPIC Component", () => {
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
    render(
      <BrowserRouter>
        <InnovationList />
      </BrowserRouter>
    ); // Simulate next tick

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.nasa.gov/techtransfer/patent/?engine&api_key=k8Ge2bvALEcbfpJbov0OoOzF8ybEfycFbYEG0t40"
    );
  });
});
