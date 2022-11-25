/**
 * @author Alex
 * @created 11/23 2022
 *
 **/
import { aesEncrypt, aesDecrypt } from "./aes";

/**
 * @param key localstorage key
 * @return localstorage vlue
 **/
const readLocalStorageByKey = (key) => {
  if (!key) return null;

  const data = localStorage.getItem(key);
  let result = null;

  try {
    result = JSON.parse(data);
  } catch (e) {
  }
  return result;
};

/**
 * @param key localstorage key
 * @return  true | false
 **/
const setLocalStorage = (key, str) => {
  if (!key) return false;

  localStorage.setItem(key, str);
  return true;
};

/**
 * @param pass password
 * @param key localstorage key
 * @return null | decrypted data
 **/
const readSecureLocalStorageByKey = (pass, key) => {
  if (!pass || typeof pass !== "string" || !key || typeof key !== "string") {
    return null;
  }

  const secureText = localStorage.getItem(key);
  return aesDecrypt(pass, secureText);
};

/**
 * @param pass password
 * @param key localstorage key
 * @return true | false
 **/
const setSecureLocalStorage = (pass, key, data) => {
  if (
    !pass ||
    typeof pass !== "string" ||
    !key ||
    typeof key !== "string" ||
    !data
  ) {
    return false;
  }

  const chipherText = aesEncrypt(pass, JSON.stringify(data));
  localStorage.setItem(key, chipherText);

  return true;
};

export {
  readLocalStorageByKey,
  setLocalStorage,
  readSecureLocalStorageByKey,
  setSecureLocalStorage,
};
