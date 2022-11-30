import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { getWallets, getWalletPrivateKeys, getChainList } from "./lib/wallet";

window.prompt = () => {
    return "123456";
};

window.alert = (str) => {
    return str;
};

const testNetwork = {
    name: "Test script network",
    rpc: "Test script rpc",
    chainId: "Test script chainId",
    symbol: "Test script symbol",
    explorerUrl: "Test script explorerUrl",
};

describe("Test Rendering", () => {
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

    test("Rendering '+ Add Network'", () => {
        expect(screen.getByText(/\+ Add Network/i)).toBeInTheDocument();
    });

    test("Rendering Binance test net rendering by default", () => {
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

    test("Rendering add network page", () => {
        fireEvent.click(screen.getByText("+ Add Network"));
        expect(screen.getByText(/Network name/i)).toBeInTheDocument();
        expect(screen.getByText(/New RPC URL/i)).toBeInTheDocument();
        expect(screen.getByText(/Chain ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Currency symbol/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Block explorer URL \(Optional\)/i)
        ).toBeInTheDocument();
        expect(screen.getByText("+ Add")).toBeInTheDocument();
    });
});

describe("Test CRUD of Network", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    });

    test("Create a new network (checked all input fields and show toast)", () => {
        fireEvent.click(screen.getByText("+ Add Network"));

        fireEvent.change(screen.getByTestId("name"), {
            target: { value: testNetwork.name },
        });
        fireEvent.change(screen.getByTestId("rpc"), {
            target: { value: testNetwork.rpc },
        });
        fireEvent.change(screen.getByTestId("chainId"), {
            target: { value: testNetwork.chainId },
        });
        fireEvent.change(screen.getByTestId("symbol"), {
            target: { value: testNetwork.symbol },
        });
        fireEvent.change(screen.getByTestId("explorerUrl"), {
            target: { value: testNetwork.explorerUrl },
        });
        fireEvent.click(screen.getByText("+ Add"));
        expect(screen.getByText(testNetwork.name)).toBeInTheDocument();
        fireEvent.click(screen.getByText("+ Add Network"));

        expect(screen.getByText("Added a new network"));
    });

    test("Add the network that just added to local storage", () => {
        const _chainList = getChainList();
        expect(_chainList.length).toEqual(2);
        expect(_chainList[1].name).toEqual(testNetwork.name);
        expect(_chainList[1].rpc).toEqual(testNetwork.rpc);
        expect(_chainList[1].chainId).toEqual(testNetwork.chainId);
        expect(_chainList[1].symbol).toEqual(testNetwork.symbol);
        expect(_chainList[1].explorerUrl).toEqual(testNetwork.explorerUrl);
    });

    test("Read the network that just added from local storage", () => {
        expect(screen.getByText(testNetwork.name)).toBeInTheDocument();
    });

    test("Update the network that just added", () => {
        fireEvent.click(screen.getByText(testNetwork.name));

        fireEvent.change(screen.getByTestId("name"), {
            target: { value: "Test script network for update" },
        });

        fireEvent.click(screen.getByText("Update"));

        expect(screen.getByText("Updated the network"));
    });

    test("Update the network that just added from local storage", () => {
        const _chainList = getChainList();
        expect(_chainList.length).toEqual(2);
        expect(_chainList[1].name).toEqual("Test script network for update");
        expect(_chainList[1].rpc).toEqual(testNetwork.rpc);
        expect(_chainList[1].chainId).toEqual(testNetwork.chainId);
        expect(_chainList[1].symbol).toEqual(testNetwork.symbol);
        expect(_chainList[1].explorerUrl).toEqual(testNetwork.explorerUrl);
    });

    test("Delete the network that just updated (checked show toast)", () => {
        fireEvent.click(screen.getByText("Test script network for update"));
        fireEvent.click(screen.getByText("Remove Network"));

        expect(screen.getByText("Deleted a network"));
    });

    test("Remove the network that just updated from local storage", () => {
        const _chainList = getChainList();
        expect(_chainList.length).toEqual(1);
    });
});

describe("Test Wallet Generation", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    });

    test("Create a new wallet (show toast)", () => {
        fireEvent.click(screen.getByText("Create Wallet"));
        expect(screen.getByText("Created a new wallet")).toBeInTheDocument();
    });

    test("Save the new wallet public key to local storage", () => {
        const _publicKeys = getWallets();
        expect(_publicKeys.length).toEqual(1);
    });

    test("Save the new wallet private key to local storage by AES encryption", () => {
        const _privateKeys = getWalletPrivateKeys("123456");
        expect(_privateKeys.length).toEqual(1);
    });

    test("Show 'Export Private Key' button after the new wallet was generated", () => {
        expect(screen.getByText("Export Private Key")).toBeInTheDocument();
    });

    test("Select an wallet address after the new wallet was generated", () => {
        expect(screen.getByText(/0x/i)).toBeInTheDocument();
    });

    test("Show 'Create Wallet' button when click the selected wallet address", () => {
        fireEvent.click(screen.getByText(/0x/i));
        expect(screen.getByText("Create Wallet")).toBeInTheDocument();
    });

    test("Export private key", () => {
        const _privateKeys = getWalletPrivateKeys("123456");
        expect(_privateKeys.length).toEqual(1);
        fireEvent.click(screen.getByText("Export Private Key"));
    });
});
