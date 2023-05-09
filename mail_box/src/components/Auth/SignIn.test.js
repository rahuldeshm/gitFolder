import { render, screen } from "@testing-library/react";
import SignIn from "./SignIn";

describe("Sign in", () => {
  test("renders welcome page if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => authorised,
    });
  });
});
