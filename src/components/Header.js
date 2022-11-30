import React from "react";
import ChooseWallet from "./ChooseWallet";
import ExportPrivateKey from "./ExportPrivateKey";
import { WALLET_ADDRESS } from "../config/constant";
import store from "../config/store";

const Header = () => {
    const [walletAddress] = store.useState(WALLET_ADDRESS);
    return (
        <header className="App-header">
            <h1>Simple Wallet Keeper</h1>
            <ChooseWallet />
            {walletAddress && <ExportPrivateKey />}
        </header>
    );
};

export default Header;
