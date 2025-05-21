interface PopupProps {
  visible: boolean;
  dueTime: string;
  displayPaymentAmount: string;
  loanPrincipal: string;
  repayInterest: string;
  overdueFee: string;
  repaidAmount: string;
  periodNo: number;
  periodStatus: boolean;
}

interface DueDateProps {
  monthTen: string;
  monthUnits: string;
  dayTen: string;
  dayUnits: string;
  daysDiff?: number;
}

export type { PopupProps, DueDateProps };
