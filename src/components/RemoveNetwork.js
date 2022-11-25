import React from "react";
import { setChainList } from "../lib/wallet";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toast";
import {
    BINACNE_TEST_NET,
    STORE_CHAIN,
  } from "../config/constant";
import store from "../config/store";

const RemoveNetwork = () => {
    const navigation = useNavigate();
    const location = useLocation();
    const state = location.state;
    const chainId = state?.chainId ? state.chainId : BINACNE_TEST_NET.chainId;
    const [, updateChainList] = store.useState(STORE_CHAIN);

    const deleteNetwork = () => {
        if (chainId === BINACNE_TEST_NET.chainId) {
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
            chainId: BINACNE_TEST_NET.chainId,
            rpc: BINACNE_TEST_NET.rpc,
            symbol: BINACNE_TEST_NET.symbol,
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