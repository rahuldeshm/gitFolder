import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
describe("Sign Up", () => {
  test("renders button of Sign Up", () => {
    render(<SignUp />);
    expect(screen.getByRole("button")).toHaveAccessibleName("Sign Up", {
      exact: false,
    });
  });
  test("renders input of email", () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText("email")).not.toBeFalsy();
  });
  test("renders input of Password", () => {
    render(<SignUp />);
    expect(screen.getAllByPlaceholderText("password")).not.toBeFalsy();
  });
});
