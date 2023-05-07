import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

describe("Profile component", () => {
  test("contact Details", () => {
    render(<Profile />);
    const details = screen.getByText("contact details", { exact: false });
    expect(details).toBeInTheDocument();
  });
  test("update", () => {
    render(<Profile />);
    const up = screen.getByText("update", { exact: false });
    expect(up).toBeInTheDocument();
  });
});
