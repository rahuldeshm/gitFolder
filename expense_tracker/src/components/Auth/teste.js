import { render, screen } from "@testing-library/react";
import ForgotPass from "./ForgotPass";

describe("Forgot pass", () => {
  test("tenders Send link", () => {
    render(<ForgotPass />);
    const send = screen.getByText("send link");
    expect(send).toBeInTheDocument();
  });
});
