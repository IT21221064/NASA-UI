import { BrowserRouter as Router } from "react-router-dom";
import { it, expect, describe } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent

import Login from "../src/pages/Auth/Login";

import "@testing-library/jest-dom/vitest";

describe("Login component", () => {
  it("Filling details and clicking buttons in a login form", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Find input fields by placeholder text
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");

    // Simulate typing in the input fields
    userEvent.type(emailInput, "hello");
    userEvent.type(passwordInput, "123");

    // Simulate clicking on the submit button
    userEvent.click(screen.getByRole("button", { name: "Login" }));
  });
});
