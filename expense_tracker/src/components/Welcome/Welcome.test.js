import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../Store";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Welcome from "./Welcome";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Profile component", () => {
  test("renders your profile on screen", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText("your profile", { exact: false })
    ).toBeInTheDocument();
  });
  test("renders welcome", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("welcome", { exact: false })).toBeInTheDocument();
  });
  test("renders contact details", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      const link = screen.getByRole("link");
      userEvent.click(link);
    });

    expect(
      screen.getByText("contact details", { exact: false })
    ).toBeInTheDocument();
  });
});
