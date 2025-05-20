// Order Details Images
const orderImages = {
  AMOUNT_BG: new URL("@/assets/images/orderDetails/amountBg.png", import.meta.url).href,
  REPAYAMOUNT_BG: new URL("@/assets/images/orderDetails/repayAmountBg.png", import.meta.url).href,
  PRODUCT_BG: new URL("@/assets/images/orderDetails/productBg.png", import.meta.url).href,
  REPAYPRODUCT_BG: new URL("@/assets/images/orderDetails/repayProductBg.png", import.meta.url).href,
  ORDER_ICON: new URL("@/assets/images/orderDetails/orderIcon.png", import.meta.url).href,
  TIME_ICON: new URL("@/assets/images/orderDetails/timeIcon.png", import.meta.url).href,
  MAX_AMOUNT: new URL("@/assets/images/orderDetails/maximumAmount.png", import.meta.url).href,
  NOT_ICON: new URL("@/assets/images/orderDetails/notIcon.png", import.meta.url).href,
} as const;

const appLogo = new URL("@/assets/images/logo.png", import.meta.url).href;

const ModalImages = {
  SCORE_BG: new URL("@/assets/images/modal/ScoreBg.png", import.meta.url).href,
  SCORERESULT_BG: new URL("@/assets/images/modal/ScoreResultBg.png", import.meta.url).href,
  SELECT: new URL("@/assets/images/modal/select.png", import.meta.url).href,
  SELECTED: new URL("@/assets/images/modal/selected.png", import.meta.url).href,
};

const accessFailImage = {
  EMPTY: new URL("@/assets/images/accessFails/empty.png", import.meta.url).href,
};

const singleRepaymentImages = {
  CHECK: new URL("@/assets/images/singleRepayment/check.png", import.meta.url).href,
  CHECKED: new URL("@/assets/images/singleRepayment/checked.png", import.meta.url).href,
  ARROW: new URL("@/assets/images/singleRepayment/arrow.png", import.meta.url).href,
  ARROW_WHITE: new URL("@/assets/images/singleRepayment/arrow_w.png", import.meta.url).href,
  CLOSE_POPUP: new URL("@/assets/images/singleRepayment/closePopup.png", import.meta.url).href,
  REPAY_AMOUNT: new URL("@/assets/images/singleRepayment/repayAmount.png", import.meta.url).href,
  REPAY_AMOUNT_DUE: new URL("@/assets/images/singleRepayment/repayAmountDue.png", import.meta.url)
    .href,
};

const repaymentMethodImages = {
  METHOD_AMOUNT: new URL("@/assets/images/repaymentMethods/method_amount.png", import.meta.url)
    .href,
  METHOD_SELECT: new URL("@/assets/images/repaymentMethods/method_select.png", import.meta.url)
    .href,
  METHOD_SELECTED: new URL("@/assets/images/repaymentMethods/method_selected.png", import.meta.url)
    .href,
};

const repaymentCodeImages = {
  DATE_BG: new URL("@/assets/images/repaymentCode/dateBg.png", import.meta.url).href,
  ASSISTANCE: new URL("@/assets/images/repaymentCode/assistance.png", import.meta.url).href,
  TEST_ASSISTANCE: new URL("@/assets/images/repaymentCode/testAssis.png", import.meta.url).href,
  TIP_BELL: new URL("@/assets/images/repaymentCode/tipBell.png", import.meta.url).href,
};

const customerImages = {
  TOP_BG: new URL("@/assets/images/customerService/topBg.png", import.meta.url).href,
  CUSTOMER: new URL("@/assets/images/customerService/customer.png", import.meta.url).href,
  SMART: new URL("@/assets/images/customerService/smart.png", import.meta.url).href,
  EMAIL: new URL("@/assets/images/customerService/email.png", import.meta.url).href,
  COMMON_GO: new URL("@/assets/images/customerService/common_go.png", import.meta.url).href,
};

const complaintImage = {
  ARROW_DOWN: new URL("@/assets/images/complaint/arrow_down.png", import.meta.url).href,
  AVATAR: new URL("@/assets/images/complaint/avatar.png", import.meta.url).href,
  BAD: new URL("@/assets/images/complaint/bad.png", import.meta.url).href,
  COMICON_1: new URL("@/assets/images/complaint/comIcon_1.png", import.meta.url).href,
  COMICON_2: new URL("@/assets/images/complaint/comIcon_2.png", import.meta.url).href,
  COMICON_3: new URL("@/assets/images/complaint/comIcon_3.png", import.meta.url).href,
  COMICON_4: new URL("@/assets/images/complaint/comIcon_4.png", import.meta.url).href,
  CUSTOM_LOGO: new URL("@/assets/images/complaint/custom_logo.png", import.meta.url).href,
  GOOD: new URL("@/assets/images/complaint/good.png", import.meta.url).href,
  MORE: new URL("@/assets/images/complaint/more.png", import.meta.url).href,
  SUCCESS_TIP: new URL("@/assets/images/complaint/success_tip.png", import.meta.url).href,
  ZAN_NO_SELECTED: new URL("@/assets/images/complaint/zan_no_selected.png", import.meta.url).href,
  ZAN_NO: new URL("@/assets/images/complaint/zan_no.png", import.meta.url).href,
  ZAN_SURE_SELECTED: new URL("@/assets/images/complaint/zan_sure_selected.png", import.meta.url).href,
  ZAN_SURE: new URL("@/assets/images/complaint/zan_sure.png", import.meta.url).href,
}

export {
  orderImages,
  appLogo,
  ModalImages,
  accessFailImage,
  singleRepaymentImages,
  repaymentMethodImages,
  repaymentCodeImages,
  customerImages,
  complaintImage,
};
