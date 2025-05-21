interface RepaymentOfDelayData {
  ["grouped"]: {
    ["deserts"]: string;
    ["impartial"]: string;
    ["fellows"]: string;
  };
  ["charmingly"]: {
    ["professions"]: string;
    ["welcomed"]: string;
  };
  ["principally"]: Array<{
    ["deserts"]: string;
    ["impartial"]: string;
  }>;
  ["laughingly"]: {
    ["deserts"]: string;
    ["impartial"]: string;
  };
  ["avenue"]: string;
  ["rising"]: string;
  ["laudable"]: string;
  ["advantageous"]: number;
  ["purposely"]: string;
  ["witticisms"]: string;
  ["prevailed"]: string;
  ["departed"]: string;
  ["engagement"]: string;
}

interface HeaderDataTypes {
  displayTotalText?: string;
  displayTotalAmount?: string;
  note?: string;
}

interface RepaymentDetailItemTypes {
  text?: string;
  value?: string;
}

interface RepaymentAmountDataTypes {
  text?: string;
  value?: string;
}

class ExtendedRepaymentData {
  totalPaymentInfo?: HeaderDataTypes;
  repaymentDetailData?: RepaymentDetailItemTypes[];
  repaymentAmountData?: RepaymentAmountDataTypes;
  repaymentAmount?: string;
  overdueDay?: number;
  repayDate?: string;
  productName?: string;
  productLogo?: string;
  orderNo?: string;
  expiryTime?: string;

  constructor({
    totalPaymentInfo,
    repaymentDetailData,
    repaymentAmountData,
    repaymentAmount,
    overdueDay,
    repayDate,
    productName,
    productLogo,
    orderNo,
    expiryTime,
  }: {
    totalPaymentInfo?: HeaderDataTypes;
    repaymentDetailData?: RepaymentDetailItemTypes[];
    repaymentAmountData?: RepaymentAmountDataTypes;
    repaymentAmount?: string;
    overdueDay?: number;
    repayDate?: string;
    productName?: string;
    productLogo?: string;
    orderNo?: string;
    expiryTime?: string;
  }) {
    this.totalPaymentInfo = totalPaymentInfo;
    this.repaymentDetailData = repaymentDetailData;
    this.repaymentAmountData = repaymentAmountData;
    this.repaymentAmount = repaymentAmount;
    this.overdueDay = overdueDay;
    this.repayDate = repayDate;
    this.productName = productName;
    this.productLogo = productLogo;
    this.orderNo = orderNo;
    this.expiryTime = expiryTime;
  }

  static parseJson(
    data: Partial<RepaymentOfDelayData> | null | undefined,
  ): ExtendedRepaymentData | null {
    if (!data) return null;

    return new ExtendedRepaymentData({
      totalPaymentInfo: this.processHeaderData(data["grouped"]),
      repaymentDetailData: this.processRepaymentDetailData(data["principally"]),
      repaymentAmountData: this.processRepaymentAmountData(data["laughingly"]),
      repaymentAmount: data["avenue"],
      overdueDay: data["advantageous"],
      repayDate: data["laudable"],
      productName: data["charmingly"]?.["professions"],
      productLogo: data["charmingly"]?.["welcomed"],
      orderNo: data["rising"],
      expiryTime: data["purposely"],
    });
  }

  static processHeaderData(item?: RepaymentOfDelayData["grouped"]): HeaderDataTypes | undefined {
    return (
      item && {
        displayTotalText: item["deserts"],
        displayTotalAmount: item["impartial"],
        note: item["fellows"],
      }
    );
  }

  static processRepaymentDetailData(
    data?: RepaymentOfDelayData["principally"],
  ): RepaymentDetailItemTypes[] | undefined {
    return (
      data &&
      data.map((item) => ({
        text: item["deserts"],
        value: item["impartial"],
      }))
    );
  }

  static processRepaymentAmountData(
    data?: RepaymentOfDelayData["laughingly"],
  ): RepaymentAmountDataTypes | undefined {
    return (
      data && {
        text: data["deserts"],
        value: data["impartial"],
      }
    );
  }
}
export { ExtendedRepaymentData };
export type { HeaderDataTypes, RepaymentDetailItemTypes, RepaymentAmountDataTypes };
