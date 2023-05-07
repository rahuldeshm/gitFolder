import { Provider } from "react-redux";
import ForgotPass from "./ForgotPass";
import { render, screen } from "@testing-library/react";
import store from "../../Store";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

describe("forgot pass component", () => {
  test("renders expense as text", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ForgotPass />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText("expense tracker", { exact: false })
    ).toBeInTheDocument();
  });
  test("Renders new here on the screen", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ForgotPass />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("new here", { exact: false })).toBeInTheDocument();
  });
});
