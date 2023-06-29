import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Hero } from "./HeroSection";

describe("Testing Hero component", () => {
  it("should show heading in component", () => {
    render(<Hero />);

    const mainHead = screen.getByRole("heading");

    expect(mainHead).toBeInTheDocument();
    expect(mainHead).toHaveTextContent("Calculate Your BMI");
  });

  it("should show two input fields for height and weight", () => {
    render(<Hero />);

    const inputs = screen.getAllByRole("spinbutton");

    expect(inputs.length).toBe(2);
    expect(inputs[0]).toHaveAttribute("placeholder", "Enter your height in cm");
    expect(inputs[1]).toHaveAttribute("placeholder", "Enter your weight in kg");
  });

  it("should show a button to calculate BMI", () => {
    render(<Hero />);

    const mainBtn = screen.getByRole("button");

    expect(mainBtn).toBeInTheDocument();
    expect(mainBtn).toHaveTextContent("Calculate");
  });
});
