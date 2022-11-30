/**
 * @author Alex
 * @created 11/23 2022
 *
 **/
import Web3 from "web3";
import {
    readLocalStorageByKey,
    readSecureLocalStorageByKey,
    setLocalStorage,
    setSecureLocalStorage,
} from "./localStorage";
import {
    STORE_WALLET_PUBLIC_KEY,
    STORE_WALLET_PRIVATE_KEY,
    STORE_CHAIN,
    BINANCE_TEST_NET,
} from "../config/constant";

/**
 * @param providerUrl
 * @return Provider
 **/
const getProvider = (providerUrl) => {
    return new Web3.providers.HttpProvider(providerUrl);
};

const getWeb3 = (rpcUrl) => {
    const provider = getProvider(rpcUrl);
    const web3 = new Web3(provider);
    return web3;
};

/**
 * @returns { address, privateKey }
 * @dev generate a new wallet
 */
const generateWallet = (web3) => {
    return web3.eth.accounts.create();
};

/**
 * @return wallet array
 * @dev get wallet list from local storage
 **/
const getWallets = () => {
    const wallets = readLocalStorageByKey(STORE_WALLET_PUBLIC_KEY);
    if (wallets) {
        return wallets;
    }
    return [];
};

/**
 * @param wallets wallet list
 * @return bool
 * @dev save wallet list in local storage
 */
const setWallets = (wallets) => {
    return setLocalStorage(STORE_WALLET_PUBLIC_KEY, JSON.stringify(wallets));
};

/**
 * @param pass wallet password
 * @return private key list
 * @dev get private keys list from local storage
 **/
const getWalletPrivateKeys = (pass) => {
    const privateKeys = readSecureLocalStorageByKey(
        pass,
        STORE_WALLET_PRIVATE_KEY
    );
    if (privateKeys) {
        return privateKeys;
    }
    return [];
};

/**
 * @param pass password
 * @param privateKeys private keys list
 * @return bool
 * @dev save privateKeys in local storage
 **/
const setWalletPrivateKeys = (pass, privateKeys) => {
    let _prev = getWalletPrivateKeys(pass);
    _prev = _prev.concat(privateKeys);
    const _wallets = getWallets();
    if (_prev.length !== _wallets.length + 1) {
        return false;
    }
    return setSecureLocalStorage(pass, STORE_WALLET_PRIVATE_KEY, _prev);
};

const getChainList = () => {
    let chainList = readLocalStorageByKey(STORE_CHAIN);
    try {
        chainList = JSON.parse(chainList);
    } catch (e) {}
    if (Array.isArray(chainList)) {
        return chainList;
    } else {
        setLocalStorage(STORE_CHAIN, JSON.stringify([BINANCE_TEST_NET]));
        return [BINANCE_TEST_NET];
    }
};

const setChainList = (data) => {
    setLocalStorage(STORE_CHAIN, JSON.stringify(data));
};

export {
    generateWallet,
    getWallets,
    setWallets,
    getWalletPrivateKeys,
    setWalletPrivateKeys,
    getChainList,
    setChainList,
    getProvider,
    getWeb3,
};
