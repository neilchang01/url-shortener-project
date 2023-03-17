import React from "react";
import Form from "../components/Form";

import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

describe("Form component", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <Form
        url=""
        isCopy={false}
        isCopied={false}
        setIsCopied={vi.fn()}
        handleSubmit={vi.fn()}
        handleChange={vi.fn()}
      />
    );

    expect(getByPlaceholderText("Enter URL here")).toBeInTheDocument();
    expect(getByText("Shorten")).toBeInTheDocument();
  });

  it("calls handleSubmit when shorten button is clicked", () => {
    const handleSubmit = vi.fn();
    const { getByText } = render(
      <Form
        url="https://example.com"
        isCopy={false}
        isCopied={false}
        setIsCopied={vi.fn()}
        handleSubmit={handleSubmit}
        handleChange={vi.fn()}
      />
    );

    fireEvent.submit(getByText("Shorten"));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("calls handleChange when input value changes", () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = render(
      <Form
        url=""
        isCopy={false}
        isCopied={false}
        setIsCopied={vi.fn()}
        handleSubmit={vi.fn()}
        handleChange={handleChange}
      />
    );

    fireEvent.change(getByPlaceholderText("Enter URL here"), {
      target: { value: "https://example.com" },
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
