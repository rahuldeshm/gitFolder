import { render, screen } from "@testing-library/react";
import store from "./../../Store";
import Expenses from "./Expenses";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import ExpensePage from "./ExpensePage";
describe("expenses", () => {
  test("expenses", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ExpensePage />
        </BrowserRouter>
      </Provider>
    );
    const expenses = screen.getByText("expenses", { exact: false });
    expect(expenses).toBeInTheDocument();
  });
});
