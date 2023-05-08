import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "pl", title: "test" }],
    });
    render(<Async />);
    const listitem = await screen.findAllByRole("listitem"); //has default timer of 1sec.

    expect(listitem).not.toHaveLength(0);
  });
});
// we don't want to send http requests to our server while testing.
/* 
that will cause lot of network traffic it will hammer the server with requests with lot of tests 
your requests will start manuplating the server data 
we generally want to do is that ither 1. we don't want to send a request or we will send it to fake server or testimg server
we will use mock function dummy function.
*/
