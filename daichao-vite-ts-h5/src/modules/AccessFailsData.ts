interface RawRepaymentProduct {
  ["pitiable"]: number;
  ["perforce"]?: string;
  ["grace"]?: string;
  ["contradict"]?: string;
  ["despise"]?: string;
  ["vivacity"]?: string;
}

interface RawRecProduct {
  ["distressing"]?: number;
  ["welcomed"]?: string;
  ["professions"]?: string;
  ["contradict"]?: string;
  ["jealous"]?: string;
  ["inferiority"]?: string;
  ["bewitched"]?: string;
  ["archness"]?: string;
}

interface RawAccessFailsData {
  ["affront"]?: string;
  ["disliking"]?: string;
  ["provoke"]?: string;
  ["yawned"]?: RawRepaymentProduct[];
  ["recovery"]?: RawRecProduct[];
}

interface RepaymentProductTypes {
  id: number;
  productLogo: string;
  productName: string;
  amount: string;
  repaymentDate: string;
  url: string;
}

interface RecProductTypes {
  id: number;
  buttonStatus: number;
  buttonText: string;
  productLogo: string;
  productName: string;
  amountRange: string;
  amountRangeDes: string;
  termInfo: string;
  loanTermText: string;
  loanRate: string;
  loanRateDes: string;
}

class AccessFailsData {
  titleMessage: string;
  errMessage: string;
  noticeMessage: string;
  recProducts: RecProductTypes[];
  repaymentProducts: RepaymentProductTypes[];

  constructor(params: {
    titleMessage: string;
    errMessage: string;
    noticeMessage: string;
    repaymentProducts: RepaymentProductTypes[];
    recProducts: RecProductTypes[];
  }) {
    this.titleMessage = params.titleMessage;
    this.errMessage = params.errMessage;
    this.noticeMessage = params.noticeMessage;
    this.recProducts = params.recProducts;
    this.repaymentProducts = params.repaymentProducts;
  }

  static parseJson(data: RawAccessFailsData | null): AccessFailsData | null {
    if (!data) return null;

    return new AccessFailsData({
      titleMessage: data["affront"] ?? "",
      errMessage: data["disliking"] ?? "",
      noticeMessage: data["provoke"] ?? "",
      repaymentProducts: this.processRepaymentProducts(data["yawned"]),
      recProducts: this.processRecProducts(data["recovery"]),
    });
  }

  private static processRepaymentProducts(data?: RawRepaymentProduct[]): RepaymentProductTypes[] {
    if (!data) return [];

    return data.map((item) => ({
      id: item["pitiable"],
      productLogo: item["perforce"] ?? "",
      productName: item["grace"] ?? "",
      amount: item["contradict"] ?? "",
      repaymentDate: item["despise"] ?? "",
      url: item["vivacity"] ?? "",
    }));
  }

  private static processRecProducts(data?: RawRecProduct[]): RecProductTypes[] {
    if (!data) return [];

    return data.map((item) => ({
      id: item["distressing"] ?? 0,
      buttonStatus: 1,
      buttonText: "Apply Now",
      productLogo: item["welcomed"] ?? "",
      productName: item["professions"] ?? "",
      amountRange: item["contradict"] ?? "",
      amountRangeDes: "Available up to",
      termInfo: item["jealous"] ?? "",
      loanTermText: item["inferiority"] ?? "",
      loanRate: item["bewitched"] ?? "",
      loanRateDes: item["archness"] ?? "",
    }));
  }
}

export { AccessFailsData };
export type { RepaymentProductTypes, RecProductTypes };
