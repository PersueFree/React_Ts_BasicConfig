// 定义原始数据接口
interface RawData {
  ["resume"]: number;
  ["inflexibly"]: string;
  ["aimed"]: string;
  ["tedious"]?: string;
  ["insufferably"]?: string;
  ["dictatorial"]?: number;
  ["misleads"]?: number;
  ["grace"]?: string;
  ["perforce"]?: string;
  ["tempered"]: string;
  ["soup"]?: string;
  ["nicholls"]?: string;
  ["consult"]?: string;
  ["contradict"]?: string;
  ["quest"]?: number;
  ["controlNumber"]?: string;
  ["yawned"]?: Array<{
    ["pitiable"]: number;
    ["grace"]?: string;
    ["liveliness"]?: string;
    ["incessantly"]?: string;
    ["perforce"]?: string;
    ["derives"]?: number;
    ["timed"]?: string;
    ["nephew"]?: string;
    ["disrespect"]?: string;
    ["rebuke"]?: string;
    ["arrogant"]?: string;
    ["vivacity"]?: string;
    ["soliciting"]?: string;
    ["archbishop"]?: string;
    ["intimately"]?: string;
    ["sincere"]?: string;
  }>;
  ["yawn"]?: number;
  ["bracelets"]?: {
    ["principally"]?: Array<{
      ["deserts"]: string;
      ["impartial"]: string;
    }>;
  };
  ["sofas"]?: number;
  ["petition"]: string;
  ["anecdote"]?: number;
  ["relate"]?: {
    ["accuracy"]?: string;
    ["entertainment"]?: number;
    ["powers"]?: Array<{
      ["distressing"]: number;
      ["professions"]?: string;
      ["welcomed"]?: string;
      ["contradict"]?: string;
      ["rambled"]?: string;
      ["rejoicing"]?: string;
      ["gaily"]?: string;
      ["bye"]?: string;
      ["picturesque"]?: number;
      ["enumerating"]?: string;
    }>;
  };
  // ["apply_again"]?: boolean;
  ["salutation"]?: {
    ["advanced"]?: number;
    ["procured"]?: string;
    ["diffuseness"]: {
      ["enumerating"]?: string;
      ["crowded"]?: number;
    };
    ["congratulation"]: {
      ["enumerating"]?: string;
      ["crowded"]?: number;
    };
  };
  ["tea"]?: string;
}

interface RecProductsItem {
  ["pitiable"]: number;
  ["grace"]?: string;
  ["liveliness"]?: string;
  ["incessantly"]?: string;
  ["perforce"]?: string;
  ["derives"]?: number;
  ["timed"]?: string;
  ["nephew"]?: string;
  ["disrespect"]?: string;
  ["rebuke"]?: string;
  ["arrogant"]?: string;
  ["vivacity"]?: string;
  ["soliciting"]?: string;
  ["archbishop"]?: string;
  ["intimately"]?: string;
  ["sincere"]?: string;
}

interface EasterEggInfoItem {
  ["distressing"]: number;
  ["professions"]?: string;
  ["welcomed"]?: string;
  ["contradict"]?: string;
  ["rambled"]?: string;
  ["rejoicing"]?: string;
  ["gaily"]?: string;
  ["bye"]?: string;
  ["picturesque"]?: number;
  ["enumerating"]?: string;
}

// 定义所有嵌套对象的类型
interface OrderDetailItemTypes {
  text: string;
  value: string;
}

interface RecProductTypes {
  id: number;
  productName?: string;
  amount?: string;
  productDesc?: string;
  productLogo?: string;
  buttonStatus?: number;
  buttonText?: string;
  buttoncolor?: string;
  amountRangeDes?: string;
  interestRateText?: string;
  term?: string;
  url?: string;
  loanTerms?: string;
  interestRate?: string;
  loanTermsText?: string;
}

interface EasterEggProductTypes {
  productId: number;
  productName?: string;
  productLogo?: string;
  amount?: string;
  loanTerms?: string;
  loanTermsText?: string;
  interestRate?: string;
  interestRateText?: string;
  buttonStatus?: number;
  buttonText?: string;
}

interface EasterEggInfoTypes {
  subTitle?: string;
  expireTime?: number;
  distProducts: EasterEggProductTypes[];
}

interface LoanFailedButtonTypes {
  buttonText?: string;
  ifShow?: number;
}

interface LoanFailedDataTypes {
  orderNo?: string;
  loanStatus?: number;
  msg?: string;
  retryCard?: LoanFailedButtonTypes;
  changeCard?: LoanFailedButtonTypes;
}

interface OrderStatusDataTypes {
  isReCard: boolean;
  orderStatus: number;
  noticeStatusText: string;
  noticeDesText: string;
  sysCancel?: string;
}

interface CountdownDataTypes {
  expireTime?: number;
}

interface OrderDetailsContentTypes {
  productName?: string;
  productLogo?: string;
  orderAmount?: string;
  detail: OrderDetailItemTypes[];
}

interface LoanExcitationDataTypes {
  loanAmountAsExpect?: string;
  nextLoanAmountAsExpect?: string;
  nextNextLoanAmountAsExpect?: string;
}

interface ButtonsDataTypes {
  orderStatus: number;
  isDelay: boolean;
  h5Url: string;
}

// 主类构造参数类型
interface OrderDetailsParamsTypes {
  isReCard: boolean;
  isShowLoanMarket: boolean;
  orderStatusData: OrderStatusDataTypes;
  countdownData: CountdownDataTypes | null;
  scoreModalVisible: boolean;
  orderDetailsData: OrderDetailsContentTypes | Record<string, never>;
  loanFailed?: LoanFailedDataTypes;
  recProducts: RecProductTypes[];
  shouldDisplayEasterEgg: boolean;
  easterEggInfo: EasterEggInfoTypes;
  shouldDisplayLoanExcitation: boolean;
  loanExcitationData: LoanExcitationDataTypes;
  buttonsData: ButtonsDataTypes;
  orderNo: string;
}

class OrderDetailsData {
  isReCard: boolean;
  isShowLoanMarket: boolean;
  orderStatusData: OrderStatusDataTypes;
  countdownData: CountdownDataTypes | null;
  scoreModalVisible: boolean;
  orderDetailsData: OrderDetailsContentTypes | Record<string, never>;
  loanFailed?: LoanFailedDataTypes;
  recProducts: RecProductTypes[];
  shouldDisplayEasterEgg: boolean;
  easterEggInfo: EasterEggInfoTypes;
  shouldDisplayLoanExcitation: boolean;
  loanExcitationData: LoanExcitationDataTypes;
  buttonsData: ButtonsDataTypes;
  orderNo: string;

  constructor(params: OrderDetailsParamsTypes) {
    this.isReCard = params.isReCard;
    this.isShowLoanMarket = params.isShowLoanMarket;
    this.orderStatusData = params.orderStatusData;
    this.countdownData = params.countdownData;
    this.scoreModalVisible = params.scoreModalVisible;
    this.orderDetailsData = params.orderDetailsData;
    this.loanFailed = params.loanFailed;
    this.recProducts = params.recProducts;
    this.shouldDisplayEasterEgg = params.shouldDisplayEasterEgg;
    this.easterEggInfo = params.easterEggInfo;
    this.shouldDisplayLoanExcitation = params.shouldDisplayLoanExcitation;
    this.loanExcitationData = params.loanExcitationData;
    this.buttonsData = params.buttonsData;
    this.orderNo = params.orderNo;
  }

  static parseJson(data: RawData): OrderDetailsData | null {
    if (!data) return null;

    const loanFailed = this.processLoanFailed(data?.["salutation"], data["tempered"]);
    const isReCard = loanFailed ? loanFailed.loanStatus == 1 : false;

    return new OrderDetailsData({
      isReCard,
      isShowLoanMarket: this.processShowLoanMarket(data),
      orderStatusData: this.processOrderStatusData(data),
      countdownData: this.processCountdownData(data),
      scoreModalVisible: this.processScoreModalVisible(data),
      orderDetailsData: this.processOrderDetailsData(data),
      loanFailed,
      recProducts: this.processRecProducts(data["yawned"]),
      shouldDisplayEasterEgg: data["anecdote"] == 1,
      easterEggInfo: this.processEasterEggInfo(data["relate"]),
      shouldDisplayLoanExcitation: this.processShouldDisplayLoanExcitation(data),
      loanExcitationData: this.processLoanExcitationData(data),
      buttonsData: this.processButtonData(data),
      orderNo: data["tempered"],
    });
  }

  private static processShowLoanMarket(data: RawData): boolean {
    if (!data) return false;

    const orderStatus = data["resume"];
    const excludedStatuses = [170, 174, 180, 200, 22, 120, 10, 21];

    return !excludedStatuses.some((e) => e == orderStatus);
  }

  private static processScoreModalVisible(data: RawData): boolean {
    return data["sofas"] == 1;
  }

  private static processOrderStatusData(data: RawData): OrderStatusDataTypes {
    const loanFailed = data?.["salutation"];
    const isReCard = loanFailed ? loanFailed["advanced"] == 1 : false;

    return {
      isReCard,
      orderStatus: data["resume"],
      noticeStatusText: data["inflexibly"],
      noticeDesText: data["aimed"],
      sysCancel: data["tea"],
    };
  }

  private static processCountdownData(data: RawData): CountdownDataTypes | null {
    const apiData = data["relate"];
    const shouldDisplayEasterEgg = data["anecdote"];
    const orderStatus = data["resume"];

    return orderStatus == 21 && shouldDisplayEasterEgg == 1 && apiData
      ? { expireTime: apiData["entertainment"] }
      : null;
  }

  private static processOrderDetailsData(
    data: RawData,
  ): OrderDetailsContentTypes | Record<string, never> {
    // if ([110, 999].includes(data["resume"])) {
    //   return {};
    // }

    return {
      productName: data["grace"],
      productLogo: data["perforce"],
      orderAmount: data["contradict"],
      detail: this.processOrderDetail(data["bracelets"]),
    };
  }

  private static processOrderDetail(data: RawData["bracelets"]): OrderDetailItemTypes[] {
    const detail = data?.["principally"];
    return (
      detail?.map((item: { ["deserts"]: string; ["impartial"]: string }) => ({
        text: item["deserts"],
        value: item["impartial"],
      })) || []
    );
  }

  private static processShouldDisplayLoanExcitation(data: RawData): boolean {
    const loanFailed = this.processLoanFailed(data?.["salutation"]);
    if (loanFailed && loanFailed.loanStatus == 1) {
      return false;
    }

    const isCancelled = ["3", "4"].some((e) => e == data["tea"]);
    const orderStatus = data["resume"];

    return orderStatus == 21 || (orderStatus == 151 && !isCancelled) || orderStatus == 174;
  }

  private static processLoanExcitationData(data: RawData): LoanExcitationDataTypes {
    return {
      loanAmountAsExpect: data["soup"],
      nextLoanAmountAsExpect: data["nicholls"],
      nextNextLoanAmountAsExpect: data["consult"],
    };
  }

  private static processRecProducts(data: RawData["yawned"]): RecProductTypes[] {
    const safeData = data ?? [];
    return (
      safeData?.map(
        (item: RecProductsItem): RecProductTypes => ({
          id: item["pitiable"],
          productName: item["grace"],
          amount: item["liveliness"],
          productDesc: item["incessantly"],
          productLogo: item["perforce"],
          buttonStatus: item["derives"],
          buttonText: item["timed"],
          buttoncolor: item["nephew"],
          amountRangeDes: item["disrespect"],
          interestRateText: item["rebuke"],
          term: item["arrogant"],
          url: item["vivacity"],
          loanTerms: item["soliciting"],
          interestRate: item["archbishop"] || item["intimately"],
          loanTermsText: item["sincere"],
        }),
      ) || []
    );
  }

  private static processEasterEggInfo(data?: RawData["relate"]): EasterEggInfoTypes {
    const safeData = data ?? {
      ["accuracy"]: "",
      ["entertainment"]: 0,
      ["powers"]: [],
    };
    return {
      subTitle: safeData["accuracy"],
      expireTime: safeData["entertainment"],
      distProducts: (safeData["powers"] || []).map(
        (item: EasterEggInfoItem): EasterEggProductTypes => ({
          productId: item["distressing"],
          productName: item["professions"],
          productLogo: item["welcomed"],
          amount: item["contradict"],
          loanTerms: item["rambled"],
          loanTermsText: item["rejoicing"],
          interestRate: item["gaily"],
          interestRateText: item["bye"],
          buttonStatus: item["picturesque"],
          buttonText: item["enumerating"],
        }),
      ),
    };
  }

  private static processLoanFailed(
    data: RawData["salutation"],
    orderNo?: string,
  ): LoanFailedDataTypes | undefined {
    if (!data || Object.keys(data).length === 0) return undefined;

    const parseItem = (item: {
      ["enumerating"]?: string;
      ["crowded"]?: number;
    }): LoanFailedButtonTypes => ({
      buttonText: item["enumerating"],
      ifShow: item["crowded"],
    });

    return {
      orderNo,
      loanStatus: data["advanced"],
      msg: data["procured"],
      retryCard: parseItem(data["diffuseness"]),
      changeCard: parseItem(data["congratulation"]),
    };
  }

  private static processButtonData(data: RawData): ButtonsDataTypes {
    return {
      orderStatus: data["resume"],
      isDelay: data["quest"] == 1,
      h5Url: data["petition"],
    };
  }
}

export { OrderDetailsData }
export type {
  OrderDetailItemTypes,
  RecProductTypes,
  EasterEggProductTypes,
  EasterEggInfoTypes,
  LoanFailedButtonTypes,
  LoanFailedDataTypes,
  OrderStatusDataTypes,
  CountdownDataTypes,
  OrderDetailsContentTypes,
  LoanExcitationDataTypes,
  ButtonsDataTypes,
  OrderDetailsParamsTypes,
}
