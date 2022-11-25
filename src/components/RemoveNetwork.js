import React from "react";
import { setChainList } from "../lib/wallet";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toast";
import {
    BINANCE_TEST_NET,
    STORE_CHAIN,
  } from "../config/constant";
import store from "../config/store";

const RemoveNetwork = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const state = location.state;
    const chainId = state?.chainId ? state.chainId : BINANCE_TEST_NET.chainId;
    const [, updateChainList] = store.useState(STORE_CHAIN);

    const deleteNetwork = () => {
        if (chainId === BINANCE_TEST_NET.chainId) {
          return toast.error("You cannot remove the BINANCE TEST NET  ");
        }
        updateChainList((prev) => {
          const _next = prev.filter((item) => {
            return item.chainId !== chainId;
          });
          setChainList(_next);
          return _next;
        });
        navigation("/", {
          state: {
            chainId: BINANCE_TEST_NET.chainId,
            rpc: BINANCE_TEST_NET.rpc,
            symbol: BINANCE_TEST_NET.symbol,
          },
        });
        toast.success("Deleted a network");
      };

    return(
        <div onClick={deleteNetwork} className="Func-Button-Remove">
            Delete Network
        </div>
    )
}

export default RemoveNetwork