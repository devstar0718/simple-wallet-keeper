import React from "react";
import { setChainList } from "../lib/wallet";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toast";
import { BINANCE_TEST_NET, STORE_CHAIN } from "../config/constant";
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
                index: 0,
                name: BINANCE_TEST_NET.name,
                rpc: BINANCE_TEST_NET.rpc,
                chainId: BINANCE_TEST_NET.chainId,
                symbol: BINANCE_TEST_NET.symbol,
                explorerUrl: BINANCE_TEST_NET.explorerUrl,
            },
            replace: true,
        });
        toast.success("Deleted a network");
    };

    return (
        <button
            onClick={deleteNetwork}
            style={{
                marginTop: 20,
            }}
        >
            Remove Network
        </button>
    );
};

export default RemoveNetwork;
