import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header test", () => {
  test("Add Expenses", () => {
    render(<Header />);
    const add = screen.getByText("add expense", { exact: false });
    expect(add).toBeInTheDocument();
  });
  test("expenses", () => {
    render(<Header />);
    const expenses = screen.getByText("expenses", { exact: false });
    expect(expenses).toBeInTheDocument();
  });
});
