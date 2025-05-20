import type { MockPublicParamsType } from "@/utils/getMockPublicParams";

export const Signature = async (params: MockPublicParamsType): Promise<string> => {
  const CryptoJs = (await import("crypto-js")).default;

  const secretKey = "c82a176b374ff61cd985ea2b969220b3";
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys.map((key: string): string => `${key}${params[key]}`).join("");
  const hmac = CryptoJs.HmacSHA256(stringToSign, secretKey);
  const sign = CryptoJs.enc.Hex.stringify(hmac);
  return sign;
};

const wordsList = [
  "wise",
  "time",
  "age",
  "left",
  "right",
  "select",
  "date",
  "now",
  "ok",
  ...Array.from({ length: 10 }, () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const strLength = Math.floor(Math.random() * 4) + 3; // 随机长度3-6
    let str = "";
    for (let i = 0; i < strLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      str += chars[randomIndex];
    }
    return str;
  }),
];
export const randomStr = () => {
  const randomIndex = Math.floor(Math.random() * wordsList.length);
  return wordsList[randomIndex];
};

export const numFormat = (num: number | string): string | undefined => {
  const numStr = typeof num === "number" ? num.toString() : num;
  const parts = numStr?.split(",");

  const integerPart = parts?.[0];
  const integerDigits = integerPart?.split("").reverse();
  const formattedIntegerParts: string[] = [];

  for (let i = 0, len = integerDigits?.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      formattedIntegerParts.push(",");
    }
    formattedIntegerParts.push(integerDigits[i]);
  }
  const formattedInteger = formattedIntegerParts.reverse().join("");
  let result = formattedInteger;

  if (parts[1]) {
    result = `${formattedInteger}.${parts[1]}`;
  }

  return result;
};

export const setPageTitle = (str: string) => {
  document.title = str;
};

export const compressImage = async (file: File) => {
  const Compressor = (await import("compressorjs")).default;

  let quality = 1;
  if (file.size < 1000 * 1000) {
    //小于1M
    quality = 0.8;
  } else if (file.size < 5000 * 1000) {
    //小于5M
    quality = 0.4;
  } else if (file.size < 10000 * 1000) {
    //小于10M
    quality = 0.2;
  } else {
    //大于10M
    quality = 0.1;
  }
  console.log("compressImage", quality);
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality, //压缩比例0-1
      success: (result) => resolve(result),
      error: (err) => reject(err),
    });
  });
};

const checkNum = (n) => {
  return n < 10 ? "0" + n : n;
};

export const currentDate = (f?: string) => {
  const d = new Date();
  const YMd = checkNum(d.getMonth() + 1) + "/" + checkNum(d.getDate());
  const Hms = checkNum(d.getHours()) + ":" + checkNum(d.getMinutes());
  if (f === "date") {
    return YMd;
  }
  return YMd + " " + Hms;
};
