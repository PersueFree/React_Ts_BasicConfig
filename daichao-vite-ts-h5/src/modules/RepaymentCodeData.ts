interface RepaymentCommonData {
  repaymentCode?: string;
  repayType?: number; // 1: 钱包, 2: 银行, 3: 线下门店
  repayLogo?: string;
  repayName?: string;
  repaymentNote?: string;
}

interface RepaymentQrcodeData {
  repaymentCode?: string;
  repaymentCodeUrl?: string;
  repaymentNote?: string;
}

interface RepaymentDetailItem {
  text?: string;
  value?: string;
  note?: string;
}

interface RepaymentCountdownData {
  expiredTime?: number;
  expiredTimeText?: string;
}

interface RawRepaymentCodeData {
  ["deference"]: string;
  ["comparative"]: number;
  ["particulars"]: string;
  ["subsisting"]: number;
  ["intimacy"]: string;
  ["appertain"]?: string;
  ["precision"]: string;
  ["discuss"]: string;
  ["occurs"]: string;
  ["requester"]: Array<{
    ["deserts"]: string;
    ["impartial"]: string;
    ["fellows"]: string;
  }>;
  ["conviction"]: string;
  ["yield"]: string;
  ["offering"]: number;
  ["representation"]: string;
}

class RepaymentCodeData {
  isToJump: boolean | number;
  repayUrl?: string;
  repayType?: number; // 1: 钱包, 2: 银行, 3: 线下门店
  upperNote?: string;
  repayGuidImg?: string;
  barcode?: string;
  repaymentCommonData?: RepaymentCommonData | null;
  repaymentQrcodeData?: RepaymentQrcodeData | null;
  repaymentDetailsData?: RepaymentDetailItem[];
  repaymentCountdownData?: RepaymentCountdownData;

  constructor({
    isToJump,
    repayUrl,
    repayType,
    upperNote,
    repayGuidImg,
    barcode,
    repaymentCommonData,
    repaymentQrcodeData,
    repaymentDetailsData,
    repaymentCountdownData,
  }: {
    isToJump: boolean | number;
    repayUrl?: string;
    repayType?: number;
    upperNote?: string;
    repayGuidImg?: string;
    barcode?: string;
    repaymentCommonData?: RepaymentCommonData | null;
    repaymentQrcodeData?: RepaymentQrcodeData | null;
    repaymentDetailsData?: RepaymentDetailItem[];
    repaymentCountdownData?: RepaymentCountdownData;
  }) {
    this.isToJump = isToJump;
    this.repayUrl = repayUrl;
    this.repayType = repayType;
    this.upperNote = upperNote;
    this.repayGuidImg = repayGuidImg;
    this.barcode = barcode;
    this.repaymentCommonData = repaymentCommonData;
    this.repaymentQrcodeData = repaymentQrcodeData;
    this.repaymentDetailsData = repaymentDetailsData;
    this.repaymentCountdownData = repaymentCountdownData;
  }

  static parseJson(data: RawRepaymentCodeData | null): RepaymentCodeData | null {
    if (!data) return null;

    return new RepaymentCodeData({
      isToJump: data["comparative"] || false,
      repayUrl: data["deference"],
      repayType: data["offering"],
      upperNote: data["particulars"],
      repayGuidImg: data["yield"],
      barcode: data["conviction"],
      repaymentCommonData: this.processRepaymentCommonData(data),
      repaymentQrcodeData: this.processRepaymentQrcodeData(data),
      repaymentDetailsData: this.processRepaymentDetailsData(data["requester"]),
      repaymentCountdownData: this.processRepaymentCountdownData(data),
    });
  }

  static processRepaymentCommonData(data: RawRepaymentCodeData): RepaymentCommonData | null {
    if (!data) return null;

    const repayType = data["offering"];

    return repayType !== 4
      ? {
          repaymentCode: data["discuss"],
          repayType: data["offering"],
          repayLogo: data["appertain"],
          repayName: data["precision"],
          repaymentNote: data["occurs"],
        }
      : null;
  }

  static processRepaymentQrcodeData(data: RawRepaymentCodeData): RepaymentQrcodeData | null {
    if (!data) return null;

    const repayType = data["offering"];

    return repayType === 4
      ? {
          repaymentCode: data["discuss"],
          repaymentCodeUrl: data["representation"],
          repaymentNote: data["occurs"],
        }
      : null;
  }

  static processRepaymentDetailsData(
    data?: Array<{
      deserts?: string;
      impartial?: string;
      fellows?: string;
    }>,
  ): RepaymentDetailItem[] | undefined {
    return data?.map((item) => ({
      text: item["deserts"],
      value: item["impartial"],
      note: item["fellows"],
    }));
  }

  static processRepaymentCountdownData(
    data: RawRepaymentCodeData,
  ): RepaymentCountdownData | undefined {
    return (
      data && {
        expiredTime: data["subsisting"],
        expiredTimeText: data["intimacy"],
      }
    );
  }
}

export { RepaymentCodeData };
