interface RepayPlan {
  periodNo?: string | number;
  repayDay?: string;
  repayMoney?: string | number;
}

interface LoanAgreementDataProps {
  ["conscious"]: string;
  ["civilities"]: string;
  ["cruelly"]: string;
  ["season"]: string;
  ["atoned"]: string | number;
  ["rashness"]: number;
  ["arrogant"]: number;
  ["ride"]?: number;
  ["wilfully"]: number;
  ["denial"]: string;
  ["sweetness"]: string;
  ["converting"]: string;
  ["exceedingly"]: string;
  ["mounting"]: string;
  ["dependent"]: string;
  ["celerity"]: string;
  ["undone"]: string;
  ["fearful"]: Array<{
    ["precipitance"]: number;
    ["laudable"]: string;
    ["propitious"]: string;
  }>;
}

class LoanAgreementData {
  loanTime?: string;
  companyName?: string;
  name?: string;
  idNumber?: string;
  principal?: string | number;
  shelfProduct?: number;
  term?: string | number;
  periods?: string | number;
  firstPeriodPayTime?: string;
  dailyInterestRate?: string | number;
  dailyInterestAmount?: string | number;
  monthInterestRate?: string | number;
  serviceRate?: string | number;
  serviceFee?: string | number;
  dayOverdueRate?: string | number;
  apr?: string | number;
  repayPlans?: RepayPlan[];

  constructor({
    loanTime,
    companyName,
    name,
    idNumber,
    principal,
    shelfProduct,
    term,
    periods,
    firstPeriodPayTime,
    dailyInterestRate,
    dailyInterestAmount,
    monthInterestRate,
    serviceRate,
    serviceFee,
    dayOverdueRate,
    apr,
    repayPlans,
  }: {
    loanTime?: string;
    companyName?: string;
    name?: string;
    idNumber?: string;
    principal?: string | number;
    shelfProduct?: number;
    term?: string | number;
    periods?: string | number;
    firstPeriodPayTime?: string;
    dailyInterestRate?: string | number;
    dailyInterestAmount?: string | number;
    monthInterestRate?: string | number;
    serviceRate?: string | number;
    serviceFee?: string | number;
    dayOverdueRate?: string | number;
    apr?: string | number;
    repayPlans?: RepayPlan[];
  }) {
    this.loanTime = loanTime;
    this.companyName = companyName;
    this.name = name;
    this.idNumber = idNumber;
    this.principal = principal;
    this.shelfProduct = shelfProduct;
    this.term = term;
    this.periods = periods;
    this.firstPeriodPayTime = firstPeriodPayTime;
    this.dailyInterestRate = dailyInterestRate;
    this.dailyInterestAmount = dailyInterestAmount;
    this.monthInterestRate = monthInterestRate;
    this.serviceRate = serviceRate;
    this.serviceFee = serviceFee;
    this.dayOverdueRate = dayOverdueRate;
    this.apr = apr;
    this.repayPlans = repayPlans;
  }

  static fromJson(data: LoanAgreementDataProps): LoanAgreementData {
    return new LoanAgreementData({
      loanTime: data["conscious"],
      companyName: data["civilities"],
      name: data["cruelly"],
      idNumber: data["season"],
      principal: data["atoned"],
      shelfProduct: data["rashness"],
      term: data["arrogant"],
      periods: data["wilfully"],
      firstPeriodPayTime: data["denial"],
      dailyInterestRate: data["sweetness"],
      dailyInterestAmount: data["exceedingly"],
      monthInterestRate: data["converting"],
      serviceRate: data["mounting"],
      serviceFee: data["dependent"],
      dayOverdueRate: data["celerity"],
      apr: data["undone"],
      repayPlans: data["fearful"]?.map((item) => ({
        periodNo: item["precipitance"],
        repayDay: item["laudable"],
        repayMoney: item["propitious"],
      })),
    });
  }
}

export { LoanAgreementData };
