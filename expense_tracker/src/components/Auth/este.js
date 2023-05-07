import Auth from "./Auth";
import { render, screen } from "@testing-library/react";

describe("Auth component", () => {
  test("renders Login as text", () => {
    render(<Auth />);
    const login = screen.getByText("log in", { exact: false });

    expect(login).toBeInTheDocument();
  });
  test("Renders sign up on the screen", () => {
    render(<Auth />);
    const signup = screen.getByText("Sign up", { exact: false });
    expect(signup).toBeInTheDocument();
  });
});
