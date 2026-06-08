import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders the salary calculator", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: /lønnskalkulator/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/offshoretimer/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/netto utbetalt/i)).toBeInTheDocument();
});

test("updates calculated salary when an editable value changes", async () => {
  render(<App />);

  const hourlyRate = screen.getByLabelText(/timesats/i);
  fireEvent.change(hourlyRate, { target: { value: "300 kr" } });

  await waitFor(() => {
    expect(screen.getByLabelText(/månedslønn/i)).toHaveValue("48,750 kr");
  });
});

test("shows validation feedback for tax outside the allowed range", async () => {
  render(<App />);

  const taxPercentage = screen.getByLabelText(/^skatt$/i);
  fireEvent.change(taxPercentage, { target: { value: "101 %" } });

  expect(
    await screen.findByText("Skatt må være mellom 0-100%")
  ).toBeInTheDocument();
});

test("deducts 220 kr for the Ledere union", async () => {
  render(<App />);

  fireEvent.click(screen.getByLabelText(/^Ledere$/i));

  await waitFor(() => {
    expect(screen.getByLabelText(/^Fagforening$/i)).toHaveValue("-220 kr");
  });
});

test("does not deduct reduced annual work for leaders", async () => {
  render(<App />);

  fireEvent.click(screen.getByLabelText(/^Leder$/i));

  await waitFor(() => {
    expect(
      screen.getByLabelText(/redusert/i, {
        selector: "#reducedAnnualWorkAmount",
      })
    ).toHaveValue("0 kr");
  });
});

test("adds extra compensation amounts to gross salary", async () => {
  render(<App />);

  fireEvent.change(document.querySelector("#tankAllowance"), {
    target: { value: "500 kr" },
  });

  await waitFor(() => {
    expect(screen.getByLabelText(/^Brutto$/i)).toHaveValue("48,645.02 kr");
    expect(document.querySelector("#tankAllowanceSummary")).toHaveValue(
      "500 kr"
    );
  });
});
