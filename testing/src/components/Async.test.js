import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    render(<Async />);
    const listitem = await screen.findAllByRole("listitem"); //has default timer of 1sec.

    expect(listitem).not.toHaveLength(0);
  });
});
