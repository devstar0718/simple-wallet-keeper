import React from "react";
import { getWalletPrivateKeys } from "../lib/wallet";
import { STORE_WALLET_PUBLIC_KEY, WALLET_ADDRESS } from "../config/constant";
import store from "../config/store";
import { toast } from "react-toast";

const ExportPrivateKey = () => {
    const [walletAddress] = store.useState(WALLET_ADDRESS);
    const [walletPublicKeys] = store.useState(STORE_WALLET_PUBLIC_KEY);

    const getWalletPrivateKey = async () => {
        const _pass = prompt("Please input your password");
        const privateKeys = getWalletPrivateKeys(_pass);
        const _index = walletPublicKeys.indexOf(walletAddress);
        const _priKey = privateKeys[_index];
        if (!_priKey) {
            return toast.error("Error occurred");
        }
        alert(_priKey);
    };

    return (
        <div onClick={getWalletPrivateKey} className="Func-Button">
            Export Private Key
        </div>
    );
};

export default ExportPrivateKey;
