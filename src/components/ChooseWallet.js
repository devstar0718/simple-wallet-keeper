import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toast";
import {
    generateWallet,
    getWeb3,
    setWallets,
    setWalletPrivateKeys,
} from "../lib/wallet";
import {
    BINANCE_TEST_NET,
    STORE_WALLET_PUBLIC_KEY,
    WALLET_ADDRESS,
} from "../config/constant";
import store from "../config/store";
import { getShortWalletAddress } from "../utils/index";
import { SHOW_WALLET_LIST, WALLET_PASSWORD } from "../config/constant";

const ChooseWallet = () => {
    const [accordion, updateAccordion] = store.useState(SHOW_WALLET_LIST);

    const location = useLocation();
    const state = location.state;
    const rpc = state?.rpc ? state.rpc : BINANCE_TEST_NET.rpc;

    const [walletPublicKeys, updatePublicKeys] = store.useState(
        STORE_WALLET_PUBLIC_KEY
    );
    const [walletAddress, updateWalletAddress] = store.useState(WALLET_ADDRESS);

    const addWallet = () => {
        const web3 = getWeb3(rpc);
        const wallet = generateWallet(web3);
        const _res = setWalletPrivateKeys(WALLET_PASSWORD, wallet.privateKey);
        if (!_res) {
            return toast.error("There was an error with your password");
        }
        updatePublicKeys((prev) => {
            prev = JSON.parse(JSON.stringify(prev));
            prev.push(wallet.address);
            setWallets(prev);
            return prev;
        });
        updateWalletAddress(() => wallet.address);
        updateAccordion(() => false);
        toast.success("Created a new wallet");
    };

    const onSelectWalletItem = (item) => {
        updateWalletAddress(() => item);
        updateAccordion(() => false);
        if (walletAddress !== item) toast.success("Chosen a new wallet");
    };

    const AddWallet = () => {
        return (
            <div
                onClick={() => {
                    addWallet();
                }}
                style={{ background: "#0e0f11" }}
            >
                Create Wallet
            </div>
        );
    };

    return (
        <div className="Choose-wallet">
            <div className="Add-wallet">
                {walletAddress && (
                    <div
                        onClick={() => {
                            updateAccordion(() => true);
                        }}
                        style={{
                            backgroundColor: "#0d3fa5",
                        }}
                    >
                        {getShortWalletAddress(walletAddress)} ▽
                    </div>
                )}

                {accordion &&
                    walletPublicKeys.map((item, index) => {
                        return walletAddress !== item ? (
                            <div
                                key={index}
                                onClick={() => {
                                    onSelectWalletItem(item);
                                }}
                            >
                                {getShortWalletAddress(item)}
                            </div>
                        ) : null;
                    })}

                {(accordion || !walletAddress) && <AddWallet />}
            </div>
        </div>
    );
};

export default ChooseWallet;
