import WebViewBridge from "./WebViewBridge";

const bridge = new WebViewBridge("ph_vamo_android");
// 风控埋点
export function uploadRiskLoan(productId: string, orderNo: string | number) {
  bridge.send("phasaoo_aplR_dkuomLivn", { productId: productId, orderNo: orderNo });
}
// 跳转GooglePlay
export function openGooglePlay(appPkg: string) {
  bridge.send("pgovame_hyPlnpoelaoo_G", appPkg);
}
// 跳转Scheme
export function openUrl(url: string) {
  bridge.send("rhno_mpUalevpo", url);
}
// 关闭当前H5
export function closeSyn() {
  bridge.send("yh_nemo_copslSva");
}
// 回到App首页
export function jumpToHome() {
  bridge.send("ma_vHmo_ouToehjppm");
}
// H5页面里的拨打电话
export function callPhoneMethod(phone: string) {
  bridge.send("Me_clmo_davlPhtnehapooh", phone);
}
// 应用评分
export function toGrade() {
  bridge.send("prtvahood_G_aem");
}
// 放款重试弹窗
export function retryOrderDialog(orderNo: string | number) {
  bridge.send("pg_myha_retlrervorOiaDod", { orderNo: orderNo });
}
// 更换放款账户
export function changeAccount(productId: string, orderNo: string | number) {
  bridge.send("hncv_nu_aheogaAcmotcp", { productId: productId, orderNo: orderNo });
}
// 保存还款二维保
export function saveQrcode(imageUrl: string) {
  bridge.send("pvshamo_vad_eQcore", { imageUrl: imageUrl });
}
// 获取公参
export function getPublicParams(url: string, callback: (data) => void) {
  bridge.send("rghPaaovmeiPulbct_s_amp", url, callback);
}

// 加密数据
export function encryptData(data: string, callback: (data?: string) => void) {
  bridge.send("Dt_vaeo_nrcmapphaty", data, callback);
}

// 解密数据
export function decryptData(data: string, callback: (data?: string) => void) {
  bridge.send("ahpcmpe_doaty_vDrta", data, callback);
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
