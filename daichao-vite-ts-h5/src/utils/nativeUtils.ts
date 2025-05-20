import { getQueryParams } from "./getQueryParams";
import nativeInteraction from "./nativeInteraction";

export function uploadRiskLoan(productId, orderNo) {
  try {
    const params = getQueryParams();
    const _productId = productId || params["lsefa"];
    nativeInteraction.uploadRiskLoan(_productId, orderNo);
  } catch (e) {
    console.error(e);
  }
}
export function openGooglePlay(url) {
  try {
    nativeInteraction.openGooglePlay(url);
  } catch (e) {
    console.error(e);
  }
}

export function openUrl(url) {
  try {
    nativeInteraction.openUrl(url);
  } catch (e) {
    console.error(e);
  }
}
export function closeSyn() {
  try {
    nativeInteraction.closeSyn();
  } catch (e) {
    console.error(e);
  }
}
export function jumpToHome() {
  try {
    nativeInteraction.jumpToHome();
  } catch (e) {
    console.error(e);
  }
}
export function callPhoneMethod(phone) {
  try {
    nativeInteraction.callPhoneMethod(phone);
  } catch (e) {
    console.error(e);
  }
}
export function toGrade() {
  try {
    nativeInteraction.toGrade();
  } catch (e) {
    console.error(e);
  }
}

export function retryOrderDialog(orderNo) {
  try {
    nativeInteraction.retryOrderDialog(orderNo);
  } catch (e) {
    console.error(e);
  }
}
export function changeAccount(orderNo, productId?: string) {
  try {
    const params = getQueryParams();
    const _productId = productId || params["lsefa"];
    nativeInteraction.changeAccount(_productId, orderNo);
  } catch (e) {
    console.error(e);
  }
}

export function saveQrcode(qrcode) {
  try {
    nativeInteraction.saveQrcode(qrcode);
  } catch (e) {
    console.error(e);
  }
}
export function getPublicParams(url) {
  return new Promise((resolve, reject) => {
    try {
      nativeInteraction.getPublicParams(url, (data) => resolve(data));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
export function encryptData(data) {
  return new Promise((resolve, reject) => {
    try {
      nativeInteraction.encryptData(data, (_data) => resolve(_data));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
export function decryptData(data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      nativeInteraction.decryptData(data, (_data: string) => resolve(_data));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export default {
  uploadRiskLoan,
  openGooglePlay,
  openUrl,
  closeSyn,
  jumpToHome,
  callPhoneMethod,
  toGrade,
  retryOrderDialog,
  changeAccount,
  saveQrcode,
  getPublicParams,
  encryptData,
  decryptData,
};
