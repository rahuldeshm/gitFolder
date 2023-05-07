import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Auth from "./Auth";
import store from "../../Store";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("Auth", () => {
  test("renders forgot password in login page ", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );
    const pass = screen.getByText("forgot password", { exact: false });
    expect(pass).toBeInTheDocument();
  });
  test("renders new here in login page ", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("new here", { exact: false })).toBeInTheDocument();
  });
  test("renders Have an account", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      const link = screen.getAllByRole("heading")[1];
      userEvent.click(link);
    });

    expect(
      screen.getByText("Have an account", { exact: false })
    ).toBeInTheDocument();
  });
});
