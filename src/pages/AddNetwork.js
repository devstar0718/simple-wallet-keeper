import React, { useState } from "react";
import { toast } from "react-toast";
import { setChainList } from "../lib/wallet";
import store from "../config/store";
import { STORE_CHAIN } from "../config/constant";

const AddNetwork = () => {
    const [name, setName] = useState("");
    const [rpc, setRpc] = useState("");
    const [chainId, setChainId] = useState("");
    const [symbol, setSymbol] = useState("");
    const [explorerUrl, setExplorerUrl] = useState("");
    const [, , updateChainList] = store.useState(STORE_CHAIN);

    const initialize = () => {
        setName("");
        setRpc("");
        setChainId("");
        setSymbol("");
        setExplorerUrl("");
    };

    const saveNetwork = () => {
        if (!name || !rpc || !chainId || !symbol) {
            return toast.error("Please input all fields");
        }

        updateChainList((prev) => {
            prev.push({
                name: name,
                rpc: rpc,
                chainId: chainId,
                symbol: symbol,
                explorerUrl: explorerUrl,
            });
            setChainList(JSON.stringify(prev));
            return prev;
        });

        initialize();

        toast.success("Added a new network");
    };

    return (
        <div className="content add-network">
            <div className="box-container">
                <label>Network name</label>
                <input
                    type={"text"}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    data-testid="name"
                />

                <label>New RPC URL</label>
                <input
                    type={"text"}
                    value={rpc}
                    onChange={(e) => {
                        setRpc(e.target.value);
                    }}
                    data-testid="rpc"
                />

                <label>Chain ID</label>
                <input
                    type={"text"}
                    value={chainId}
                    onChange={(e) => {
                        setChainId(e.target.value);
                    }}
                    data-testid="chainId"
                />
                <label>Currency symbol</label>
                <input
                    type={"text"}
                    value={symbol}
                    onChange={(e) => {
                        setSymbol(e.target.value);
                    }}
                    data-testid="symbol"
                />

                <label>Block explorer URL (Optional)</label>
                <input
                    type={"text"}
                    value={explorerUrl}
                    onChange={(e) => {
                        setExplorerUrl(e.target.value);
                    }}
                    data-testid="explorerUrl"
                />

                <button onClick={saveNetwork}>+ Add</button>
            </div>
        </div>
    );
};

export default AddNetwork;
