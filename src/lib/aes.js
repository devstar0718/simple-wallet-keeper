/**
 * @author Alex
 * @created 11/23 2022
 *
 **/

import CryptoJS from "crypto-js";
import Sha256 from "crypto-js/sha256";

/**
 * @param text
 * @return hash
 **/
const hash = (text) => {
  return Sha256(text);
};

/**
 * @param pass aes encryption key
 * @param text raw text
 *
 * @return null | encrypted text
 **/
const aesEncrypt = (pass, text) => {
  if (!pass || typeof pass !== "string" || !text || typeof text !== "string") {
    return null;
  }

  return CryptoJS.AES.encrypt(text, pass).toString();
};

/**
 * @param pass aes encryption key
 * @param ciphertext cipher text
 *
 * @return null | decrypted data
 **/
const aesDecrypt = (pass, ciphertext) => {
  if (
    !pass ||
    typeof pass !== "string" ||
    !ciphertext ||
    typeof ciphertext !== "string"
  ) {
    return null;
  }

  let bytes = CryptoJS.AES.decrypt(ciphertext, pass);
  try {
    bytes = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    bytes = null;
  }
  return bytes;
};

export { aesEncrypt, aesDecrypt, hash };
