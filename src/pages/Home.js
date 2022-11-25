import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getWeb3 } from "../lib/wallet";
import { BINACNE_TEST_NET, WALLET_ADDRESS } from "../config/constant";
import Web3 from "web3";

import store from "../config/store";

const Home = () => {
  const [balance, setBalance] = useState("");

  const location = useLocation();
  const state = location.state;
  const rpcUrl = state?.rpc ? state.rpc : BINACNE_TEST_NET.rpc;
  const symbol = state?.symbol ? state.symbol : BINACNE_TEST_NET.symbol;

  const [walletAddress] = store.useState(WALLET_ADDRESS);

  const web3 = getWeb3(rpcUrl);

  useEffect(() => {
    const init = async () => {
      if (walletAddress) {
        const _balAmount = await web3.eth.getBalance(walletAddress);
        setBalance(Web3.utils.fromWei(_balAmount, "ether"));
      }
    };
    init();
  }, [web3.eth, walletAddress]);

  return (
    <div className="content">
      <h1>{balance && balance + " (" + symbol + ")"}</h1>
    </div>
  );
};

export default Home;
