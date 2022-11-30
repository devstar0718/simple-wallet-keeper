/**
 * @author Alex
 * @created 11/23 2022
 *
 **/
import { createStore } from "state-pool";
import {
    STORE_WALLET_PUBLIC_KEY,
    STORE_WALLET_PRIVATE_KEY,
    STORE_CHAIN,
    WALLET_ADDRESS,
    SHOW_WALLET_LIST,
} from "./constant";
import { getWallets, getChainList } from "../lib/wallet";

const store = createStore();
const wallets = getWallets();
store.setState(STORE_WALLET_PUBLIC_KEY, wallets);
store.setState(STORE_WALLET_PRIVATE_KEY, []);
store.setState(STORE_CHAIN, getChainList());
store.setState(WALLET_ADDRESS, wallets[0]);
store.setState(SHOW_WALLET_LIST, false);

export default store;
