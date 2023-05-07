import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "../../Store";

describe("Header test", () => {
  test("renders the heading", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const add = screen.getByText("expense tracker app", { exact: false });
    expect(add).toBeInTheDocument();
  });
});
