/**
 * @author Alex
 * @created 11/23 2022
 *
 **/

import CryptoJS from "crypto-js";

/**
 * @param pass aes encryption key
 * @param text raw text
 *
 * @return null | encrypted text
 **/
const aesEncrypt = (pass, text) => {
    if (
        !pass ||
        typeof pass !== "string" ||
        !text ||
        typeof text !== "string"
    ) {
        return null;
    }

    return CryptoJS.AES.encrypt(text, pass).toString();
};

/**
 * @param pass aes encryption key
 * @param cipher_text cipher text
 *
 * @return null | decrypted data
 **/
const aesDecrypt = (pass, cipher_text) => {
    if (
        !pass ||
        typeof pass !== "string" ||
        !cipher_text ||
        typeof cipher_text !== "string"
    ) {
        return null;
    }

    let bytes = CryptoJS.AES.decrypt(cipher_text, pass);
    try {
        bytes = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        bytes = null;
    }
    return bytes;
};

export { aesEncrypt, aesDecrypt };
