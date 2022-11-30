import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { STORE_CHAIN } from "../config/constant";
import store from "../config/store";

const Sidebar = () => {
    const [chainList] = store.useState(STORE_CHAIN);
    const location = useLocation();
    const pathname = location.pathname;
    const state = location.state;

    const navigation = useNavigate();

    return (
        <div className="App-body">
            <div className="sidebar">
                {chainList.map((item, index) => {
                    return (
                        <div
                            className={
                                pathname === "/" &&
                                (state?.chainId === item.chainId ||
                                    (state === null && index === 0))
                                    ? "item item-active"
                                    : "item"
                            }
                            onClick={() => {
                                navigation("/", {
                                    state: {
                                        index: index,
                                        chainId: item.chainId,
                                        rpc: item.rpc,
                                        symbol: item.symbol,
                                        name: item.name,
                                        explorerUrl: item.explorerUrl,
                                    },
                                });
                            }}
                            key={index}
                        >
                            {item.name}
                        </div>
                    );
                })}
                <div
                    className={
                        pathname === "/addNetwork"
                            ? "item item-add item-active"
                            : "item item-add"
                    }
                    onClick={() => {
                        navigation("/addNetwork");
                    }}
                >
                    + Add Network
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Sidebar;
