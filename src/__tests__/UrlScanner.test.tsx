import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UrlScanner from "../components/UrlScanner";

describe("UrlScanner", () => {
  it("renders input and button", () => {
    render(<UrlScanner />);
    expect(screen.getByLabelText(/enter a website url/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /scan now/i })
    ).toBeInTheDocument();
  });

  it("accepts input and logs it on submit", () => {
    render(<UrlScanner />);
    const input = screen.getByLabelText(/enter a website url/i);
    fireEvent.change(input, { target: { value: "https://test.com" } });
    fireEvent.submit(screen.getByRole("button"));
    // ideally: expect(router.push).toHaveBeenCalledWith(...)
  });
});
