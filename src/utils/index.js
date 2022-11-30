const getShortWalletAddress = (address) => {
    return address.substr(0, 5) + "..." + address.substr(-5);
};

export { getShortWalletAddress };
