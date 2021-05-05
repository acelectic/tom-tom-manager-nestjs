import CryptoJS from 'crypto-js'

type Data = {
  [name: string]: any
  [name: number]: any
}

export const encrypt = (token: string, data: Data) => {
  const key = toMD5(token)
  const painText = JSON.stringify(data)
  const iv = getRandomIV()
  const encryptedData = encryptAES(painText, key, iv)
  return encryptBase64(iv + encryptedData)
}

export const decrypt = (token: string, cipherText: string) => {
  const key = toMD5(token)
  const { iv, data } = decryptBase64(cipherText)
  return decryptAES(data, key, iv)
}

const toMD5 = (data: string) => {
  return CryptoJS.MD5(data).toString()
}

const getRandomIV = () => {
  return CryptoJS.lib.WordArray.random(8).toString()
}

const encryptAES = (painText: string, key: string, iv: string) => {
  return CryptoJS.AES.encrypt(painText, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
}

const decryptAES = (data: string, key: string, iv: string) => {
  return CryptoJS.AES.decrypt(data, key, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
}

const encryptBase64 = (text: string) => {
  const wordArray = CryptoJS.enc.Utf8.parse(text)
  return CryptoJS.enc.Base64.stringify(wordArray).toString()
}

const decryptBase64 = (cipherText: string) => {
  const text = CryptoJS.enc.Base64.parse(cipherText).toString(CryptoJS.enc.Utf8)
  return {
    iv: text.slice(0, 16),
    data: text.slice(16),
  }
}
