import { render, screen } from "@testing-library/react";
import store from "../../Store";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Provider } from "react-redux";
import SignUp from "./SignUp";

describe("Sign Up", () => {
  test("renders have a account in sign up page ", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

    // actions
    const pass = screen.getByText("sign up", { exact: false });
    expect(pass).toBeInTheDocument();
  });
});
