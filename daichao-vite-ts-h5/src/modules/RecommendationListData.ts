interface ProductData {
  productId?: number;
  productLogo?: string;
  productName?: string;
  amount?: string | number;
  loanTermsText?: string;
  loanTerms?: string;
  interestRateText?: string;
  interestRate?: string;
}

interface RawProductData {
  ["distressing"]: number; // 产品ID
  ["professions"]: string; // 产品名称
  ["welcomed"]: string; // 产品Logo URL
  ["contradict"]: string; // 借款金额
  ["jealous"]: string; // 贷款期限
  ["inferiority"]: string; // 期限说明文本
  ["bewitched"]: string; // 利率值
  ["archness"]: string; // 利率说明文本
}

class RecommendationListData {
  recProducts: ProductData[];

  constructor({ recProducts }: { recProducts?: ProductData[] }) {
    this.recProducts = recProducts || [];
  }

  static parseJson(data?: RawProductData[]): RecommendationListData | null {
    if (!data || !Array.isArray(data)) {
      return null;
    }

    return new RecommendationListData({
      recProducts: data.map((item) => this.processProductData(item)),
    });
  }

  static processProductData(data?: RawProductData): ProductData {
    if (!data) return {};

    return {
      productId: data["distressing"],
      productLogo: data["welcomed"],
      productName: data["professions"],
      amount: data["contradict"],
      loanTermsText: data["inferiority"],
      loanTerms: data["jealous"],
      interestRateText: data["archness"],
      interestRate: data["bewitched"],
    };
  }
}

export { RecommendationListData };
