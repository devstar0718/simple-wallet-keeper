import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toast";
import { setChainList } from "../lib/wallet";
import store from "../config/store";
import {
    STORE_CHAIN,
    BINANCE_TEST_NET,
    WALLET_ADDRESS,
} from "../config/constant";
import { getWeb3 } from "../lib/wallet";
import RemoveNetwork from "../components/RemoveNetwork";

const Home = () => {
    const navigation = useNavigate();

    const [balance, setBalance] = useState("");
    const location = useLocation();
    const state = location.state;
    const curIndex = state?.index ? state.index : 0;
    const curName = state?.name ? state.name : BINANCE_TEST_NET.name;
    const curRpc = state?.rpc ? state.rpc : BINANCE_TEST_NET.rpc;
    const curChainId = state?.chainId
        ? state.chainId
        : BINANCE_TEST_NET.chainId;
    const curSymbol = state?.symbol ? state.symbol : BINANCE_TEST_NET.symbol;
    const curExplorerUrl = state?.explorerUrl
        ? state.explorerUrl
        : BINANCE_TEST_NET.explorerUrl;

    const web3 = getWeb3(curRpc);
    const [walletAddress] = store.useState(WALLET_ADDRESS);

    const [name, setName] = useState(curName);
    const [rpc, setRpc] = useState(curRpc);
    const [chainId, setChainId] = useState(curChainId);
    const [symbol, setSymbol] = useState(curSymbol);
    const [explorerUrl, setExplorerUrl] = useState(curExplorerUrl);
    const [, , updateChainList] = store.useState(STORE_CHAIN);

    const saveNetwork = () => {
        if (!name || !rpc || !chainId || !symbol) {
            return toast.error("Please input all fields");
        }

        updateChainList((prev) => {
            prev[curIndex] = { name, rpc, chainId, symbol, explorerUrl };
            setChainList(JSON.stringify(prev));
            return prev;
        });

        navigation("/", {
            state: {
                index: curIndex,
                chainId: chainId,
                rpc: rpc,
                symbol: symbol,
                name: name,
                explorerUrl: explorerUrl,
            },
        });

        toast.success("Updated the network");
    };

    useEffect(() => {
        const init = async () => {
            if (walletAddress) {
                const _balAmount = await web3.eth.getBalance(walletAddress);
                setBalance(Web3.utils.fromWei(_balAmount, "ether"));
            }
        };
        init();
    }, [web3.eth, walletAddress]);

    useEffect(() => {
        setName(curName);
        setRpc(curRpc);
        setChainId(curChainId);
        setSymbol(curSymbol);
        setExplorerUrl(curExplorerUrl);
    }, [curName, curRpc, curChainId, curSymbol, curExplorerUrl]);

    return (
        <div className="content add-network">
            <div className="box-container">
                <h1>{balance && balance + " (" + curSymbol + ")"}</h1>
                <label>Network name</label>
                <input
                    type={"text"}
                    value={name}
                    data-testid="name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <label>New RPC URL</label>
                <input
                    type={"text"}
                    value={rpc}
                    data-testid="rpc"
                    onChange={(e) => {
                        setRpc(e.target.value);
                    }}
                />

                <label>Chain ID</label>
                <input
                    type={"text"}
                    value={chainId}
                    data-testid="chainId"
                    onChange={(e) => {
                        setChainId(e.target.value);
                    }}
                />
                <label>Currency symbol</label>
                <input
                    type={"text"}
                    value={symbol}
                    data-testid="symbol"
                    onChange={(e) => {
                        setSymbol(e.target.value);
                    }}
                />

                <label>Block explorer URL (Optional)</label>
                <input
                    type={"text"}
                    value={explorerUrl}
                    data-testid="explorerUrl"
                    onChange={(e) => {
                        setExplorerUrl(e.target.value);
                    }}
                />

                <button onClick={saveNetwork}>Update</button>
                <RemoveNetwork />
            </div>
        </div>
    );
};

export default Home;
