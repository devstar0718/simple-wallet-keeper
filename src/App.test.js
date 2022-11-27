import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

window.prompt = () => {
  return "123456";
};

window.alert = (str) => {
  return str;
};

beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test("Rendering 'Create Wallet' button if there is not any wallet keys", () => {
  expect(screen.getByText(/Create Wallet/i)).toBeInTheDocument();
});

test("Rendering 'Create Wallet' button if there is not any wallet keys", () => {
  expect(screen.getByText(/Create Wallet/i)).toBeInTheDocument();
});

test("Rendering '+ Add Network'", () => {
  expect(screen.getByText(/\+ Add Network/i)).toBeInTheDocument();
});

test("Check Binance test net rendering", () => {
  expect(screen.getByText(/Network name/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/BNB Test Net/i)).toBeInTheDocument();
  expect(screen.getByText(/New RPC URL/i)).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(
      /https:\/\/data-seed-prebsc-1-s1.binance.org:8545\//i
    )
  ).toBeInTheDocument();
  expect(screen.getByText(/Chain ID/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/97/i)).toBeInTheDocument();
  expect(screen.getByText(/Currency symbol/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/tBNB/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Block explorer URL \(Optional\)/i)
  ).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(/https:\/\/testnet.bscscan.com/i)
  ).toBeInTheDocument();
  expect(screen.getByText("Update")).toBeInTheDocument();
  expect(screen.getByText("Remove Network")).toBeInTheDocument();
});

test("Simulate add and remove network", () => {
  fireEvent.click(screen.getByText("+ Add Network"));
  expect(screen.getByText(/Network name/i)).toBeInTheDocument();
  expect(screen.getByText(/New RPC URL/i)).toBeInTheDocument();
  expect(screen.getByText(/Chain ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Currency symbol/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Block explorer URL \(Optional\)/i)
  ).toBeInTheDocument();
  expect(screen.getByText("+ Add")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("name"), {
    target: { value: "Test script network" },
  });
  fireEvent.change(screen.getByTestId("rpc"), {
    target: { value: "Test script rpc" },
  });
  fireEvent.change(screen.getByTestId("chainId"), {
    target: { value: "Test script chainId" },
  });
  fireEvent.change(screen.getByTestId("symbol"), {
    target: { value: "Test script symbol" },
  });
  fireEvent.change(screen.getByTestId("explorerUrl"), {
    target: { value: "Test script explorerUrl" },
  });
  fireEvent.click(screen.getByText("+ Add"));
  expect(screen.getByText("Test script network")).toBeInTheDocument();
  fireEvent.click(screen.getByText("+ Add Network"));

  expect(screen.getByText("Added a new network"));

  expect(screen.getByText("Test script network")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Test script network"));
  fireEvent.click(screen.getByText("Remove Network"));

  expect(screen.getByText("Deleted a network"));
});

test("Simulate create wallet and export private key", () => {
  fireEvent.click(screen.getByText("Create Wallet"));

  expect(screen.getByText("Created a new wallet")).toBeInTheDocument();
  expect(screen.getByText("Export Private Key")).toBeInTheDocument();
  expect(screen.getByText(/0x/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/0x/i));
  expect(screen.getByText("Create Wallet")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Export Private Key"));
});
