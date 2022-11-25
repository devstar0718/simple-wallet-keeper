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
  BINACNE_TEST_NET,
  STORE_WALLET_PUBLIC_KEY,
  WALLET_PASSWORD,
  WALLET_ADDRESS,
} from "../config/constant";
import store from "../config/store";
import { getShortWalletAddress } from "../utils/index";
import { SHOW_WALLET_LIST } from "../config/constant";

const ChooseWallet = () => {
  const [accordion, updateAccordion] = store.useState(SHOW_WALLET_LIST);

  const loacation = useLocation();
  const state = loacation.state;
  const rpc = state?.rpc ? state.rpc : BINACNE_TEST_NET.rpc;

  const [walletPublicKeys, updatePublicKeys] = store.useState(
    STORE_WALLET_PUBLIC_KEY
  );
  const [walletAddress, updateWalletAddress] = store.useState(WALLET_ADDRESS);

  const addWallet = () => {
    const web3 = getWeb3(rpc);
    const wallet = generateWallet(web3);
    updatePublicKeys((prev) => {
      prev = JSON.parse(JSON.stringify(prev));
      prev.push(wallet.address);
      setWallets(prev);
      return prev;
    });
    setWalletPrivateKeys(WALLET_PASSWORD, wallet.privateKey);
    updateWalletAddress(() => wallet.address);
    updateAccordion(() => false);
    toast.success("Created a new wallet");
  };

  const onSelectWalletItem = (item) => {
    updateWalletAddress(() => item);
    updateAccordion(() => false);
    if (walletAddress !== item) toast.success("Choosed a new wallet");
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
        {accordion &&
          walletPublicKeys.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  onSelectWalletItem(item);
                }}
                style={{
                  backgroundColor: walletAddress === item ? "#0d3fa5" : "",
                }}
              >
                {getShortWalletAddress(item)}
              </div>
            );
          })}

        {(accordion || !walletAddress) && <AddWallet />}

        {walletAddress && !accordion && (
          <div
            onClick={() => {
              updateAccordion(() => true);
            }}
          >
            {getShortWalletAddress(walletAddress)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseWallet;
