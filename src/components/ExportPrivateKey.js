import React from "react";
import { getWalletPrivateKeys } from "../lib/wallet";
import { STORE_WALLET_PUBLIC_KEY, WALLET_ADDRESS } from "../config/constant";
import store from "../config/store";
import { toast } from "react-toast";

const ExportPriateKey = () => {
  const [walletAddress] = store.useState(WALLET_ADDRESS);
  const [walletPublicKeys] = store.useState(STORE_WALLET_PUBLIC_KEY);

  const getWalletPrivateKey = async () => {
    const pass = prompt("Please input your password");
    const privateKeys = getWalletPrivateKeys(pass);
    const _index = walletPublicKeys.indexOf(walletAddress);
    const _priKey = privateKeys[_index];
    if (!_priKey) {
      return toast.error("Error occured");
    }
    alert(_priKey);
  };

  return (
    <div onClick={getWalletPrivateKey} className="Func-Button">
      Export Previate Key
    </div>
  );
};

export default ExportPriateKey;
