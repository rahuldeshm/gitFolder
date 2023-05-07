import { render, screen } from "@testing-library/react";
import NewExpense from "./NewExpense";

describe("new Expense", () => {
  test("Add Expenses", () => {
    render(<NewExpense />);
    const add = screen.getByText("add expense", { exact: false });
    expect(add).toBeInTheDocument();
  });
});
