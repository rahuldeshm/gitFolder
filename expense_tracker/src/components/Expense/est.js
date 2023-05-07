import { render, screen } from "@testing-library/react";

import Expenses from "./Expenses";
describe("expenses", () => {
  test("expenses", () => {
    render(<Expenses />);
    const expenses = screen.getByText("expenses", { exact: false });
    expect(expenses).toBeInTheDocument();
  });
});
