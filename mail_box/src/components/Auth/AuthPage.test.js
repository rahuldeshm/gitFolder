import { render, screen } from "@testing-library/react";
import AuthPage from "./AuthPage";

describe("Auth page", () => {
  test("renders button of have an account", () => {
    render(<AuthPage />);
    expect(screen.getByRole("button")).toHaveTextContent("have", {
      exact: false,
    });
  });
});
