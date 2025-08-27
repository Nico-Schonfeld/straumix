import CryptoJS from "crypto-js";

const secretKeyPrivate = process.env.NEXT_PRIVATE_KEY_ENCODE;
const secretKeyPublic = process.env.NEXT_PUBLIC_KEY_ENCODE;

export const encryptId = (id: string): string => {
  return secretKeyPrivate
    ? CryptoJS.AES.encrypt(id, secretKeyPrivate).toString()
    : "";
};

export const encryptIdPublic = (id: string): string | null => {
  return secretKeyPublic
    ? CryptoJS.AES.encrypt(id, secretKeyPublic).toString()
    : "";
};

export const decryptId = (cipherText: string): string | null => {
  if (!secretKeyPrivate || !cipherText) {
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKeyPrivate);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const decryptIdPublic = (cipherText: string): string | null => {
  if (!secretKeyPublic || !cipherText) {
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKeyPublic);

  return bytes.toString(CryptoJS.enc.Utf8);
};
