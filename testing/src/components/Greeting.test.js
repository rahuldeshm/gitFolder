import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  test("Renders Changed as text", () => {
    //Arrange

    render(<Greeting />);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    //... nothing
    // Assert
    const changed = screen.getByText("changed", { exact: false });
    expect(changed).toBeInTheDocument();
  });
  test("not render rahul deshmukh after changing", () => {
    //Arrange

    render(<Greeting />);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    //... nothing
    // Assert
    const changed = screen.queryByText("rahul deshmukh", { exact: false });
    expect(changed).toBeNull();
  });
  test("Renders rahul deshmukh as text", () => {
    //Arrange

    render(<Greeting />);

    //Act
    //... nothing
    // Assert
    const changed = screen.getByText("rahul deshmukh", { exact: false });
    expect(changed).toBeInTheDocument();
  });
});

// three A's
/* Arrange=> set up test data test conditions and test enviornment
Act => Run logic that should be tested (e.g. execute the function)
Assert => compare execution results with expected result*/
