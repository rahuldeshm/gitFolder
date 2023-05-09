import { render, screen } from "@testing-library/react";
import AuthPage from "./AuthPage";

describe("Auth page", () => {
  test("renders button of have an account", () => {
    render(<AuthPage />);
    expect(screen.getAllByRole("button")[1]).toHaveAccessibleName(
      "Have an account? Log in",
      {
        exact: false,
      }
    );
  });
});
