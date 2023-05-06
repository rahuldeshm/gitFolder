import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
describe("Greeting component", () => {
  test("Renders Hello World as text", () => {
    //Arrange

    render(<Greeting />);

    //Act
    //... nothing
    // Assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});

// three A's
/* Arrange=> set up test data test conditions and test enviornment
Act => Run logic that should be tested (e.g. execute the function)
Assert => compare execution results with expected result*/
