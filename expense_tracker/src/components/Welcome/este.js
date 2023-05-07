import Welcome from "./Welcome";
import { render, screen } from "@testing-library/react";

describe("Welcome Component", () => {
  test("renders complete profile as text", () => {
    render(<Welcome />);
    const profile = screen.getByText("complete profile", { exact: false });
    expect(profile).toBeInTheDocument();
  });
  test("welcome text", () => {
    render(<Welcome />);
    const welcometext = screen.getByText("welcome text", { exact: false });
    expect(welcometext).toBeInTheDocument();
  });
});
