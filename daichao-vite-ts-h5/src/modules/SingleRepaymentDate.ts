interface RepaymentScheduleItem {
  ["reel"]: number;
  ["songs"]: string;
  ["approbation"]: number;
  ["supposition"]: string;
  ["reprehensible"]: number;
  ["sang"]: string;
  ["eager"]: number;
  ["negatived"]: string;
  ["earnestly"]: string;
  ["polite"]: string;
  ["alacrity"]: string;
  ["indulgence"]: string;
  ["thankful"]: string;
  ["expostulation"]: string;
  ["engagements"]: number;
  ["indignity"]: number;
}

interface RepaymentData {
  ["grace"]: string;
  ["perforce"]: string;
  ["rising"]: string;
  ["laudable"]: string;
  ["earnestly"]: number;
  ["cheating"]: string;
  ["overthrowing"]: string;
  ["despising"]: RepaymentScheduleItem[];
  ["fellows"]: string;
}

interface ProcessedRepaymentScheduleTypes {
  periodNo: number;
  selected: number;
  canClick: number;
  paymentAmount: number;
  displayPaymentAmount: string;
  periodStatus: number;
  dueTime: string;
  overdueDayDes: string;
  repayDes: string;
  loanPrincipal: string;
  overdueFee: string;
  repaidAmount: string;
  repayInterest: string;
}

interface HeaderDataTypes {
  displayTotalPayment: string;
  totalPaymentText: string;
}

class SingleRepaymentDate {
  headerData: HeaderDataTypes;
  productName: string;
  productLogo: string;
  orderNo: string;
  repayDay: string;
  overdueDay: number;
  displayTotalPayment: string;
  totalPaymentText: string;
  repaymentSchedules: ProcessedRepaymentScheduleTypes[];
  note: string;

  constructor({
    headerData,
    productName,
    productLogo,
    orderNo,
    repayDay,
    overdueDay,
    displayTotalPayment,
    totalPaymentText,
    repaymentSchedules,
    note,
  }: {
    headerData: HeaderDataTypes;
    productName: string;
    productLogo: string;
    orderNo: string;
    repayDay: string;
    overdueDay: number;
    displayTotalPayment: string;
    totalPaymentText: string;
    repaymentSchedules: ProcessedRepaymentScheduleTypes[];
    note: string;
  }) {
    this.headerData = headerData;
    this.productName = productName;
    this.productLogo = productLogo;
    this.orderNo = orderNo;
    this.repayDay = repayDay;
    this.overdueDay = overdueDay;
    this.displayTotalPayment = displayTotalPayment;
    this.totalPaymentText = totalPaymentText;
    this.repaymentSchedules = repaymentSchedules;
    this.note = note;
  }

  static parseJson(data: RepaymentData | null): SingleRepaymentDate | null {
    if (!data) {
      return null;
    }

    return new SingleRepaymentDate({
      headerData: this.processHeaderData(data),
      productName: data["grace"],
      productLogo: data["perforce"],
      orderNo: data["rising"],
      repayDay: data["laudable"],
      overdueDay: data["earnestly"],
      displayTotalPayment: data["cheating"],
      totalPaymentText: data["overthrowing"],
      repaymentSchedules: this.processRepaymentSchedules(data["despising"]),
      note: data["fellows"],
    });
  }

  private static processHeaderData(data: RepaymentData): HeaderDataTypes {
    return {
      displayTotalPayment: data["cheating"],
      totalPaymentText: data["overthrowing"],
    };
  }

  private static processRepaymentSchedules(
    data: RepaymentScheduleItem[] | undefined,
  ): ProcessedRepaymentScheduleTypes[] {
    return (
      data?.map((item) => ({
        periodNo: item["reel"],
        selected: item["engagements"],
        canClick: item["eager"],
        paymentAmount: item["approbation"],
        displayPaymentAmount: item["supposition"],
        periodStatus: item["reprehensible"],
        dueTime: item["songs"],
        overdueDayDes: item["polite"],
        repayDes: item["negatived"],
        loanPrincipal: item["indulgence"],
        overdueFee: item["alacrity"],
        repaidAmount: item["thankful"],
        repayInterest: item["expostulation"],
      })) || []
    );
  }
}

export { SingleRepaymentDate };
export type { ProcessedRepaymentScheduleTypes, HeaderDataTypes };
