interface EWallets {
  ["shoe"]: number | string;
  ["cruelly"]: string;
  ["behave"]: string;
  ["voluntary"]?: number;
}

interface Banks {
  ["shoe"]: string; // 银行代码都是字符串类型
  ["cruelly"]: string;
  ["behave"]: string;
}

interface StrictRepaymentMethodsData {
  ["disengaged"]?: EWallets[];
  ["abominably"]?: Banks[];
  ["eyelashes"]?: Array<{
    ["shoe"]: number;
    ["cruelly"]: string;
    ["behave"]: string;
  }>;
  ["portraits"]?: Array<{
    ["shoe"]: number;
    ["cruelly"]: string;
    ["behave"]: string;
  }>;
  ["domestic"]?: Array<{
    ["shoe"]: number;
    ["cruelly"]: string;
    ["behave"]: string;
  }>;
}

interface PaymentMethodItemType {
  type?: string | number;
  name?: string;
  logo?: string;
  status?: number; // 1: 可用, 0: 维护中
}

interface TabData {
  name: string;
  list: PaymentMethodItemType[];
}

class RepaymentMethodsData {
  tabsData: TabData[] | null;

  constructor({ tabsData }: { tabsData: TabData[] | null }) {
    this.tabsData = tabsData;
  }

  static parseData(data: StrictRepaymentMethodsData | null): RepaymentMethodsData | null {
    if (!data) return null;

    return new RepaymentMethodsData({
      tabsData: this.processTabsData(data),
    });
  }

  static processTabsData(data: StrictRepaymentMethodsData): TabData[] | null {
    console.log("processTabsData", data);
    if (data == null) {
      return null;
    }

    const ewallet = data["disengaged"];
    const bank = data["abominably"];
    const qrcode = data["portraits"];
    const transfer = data["domestic"];
    const overTheCounter = data["eyelashes"];

    let result: TabData[] = [
      {
        name: "Billpayment",
        list: ewallet ? this.processItems(ewallet) : [],
      },
      {
        name: "Bank",
        list: bank ? this.processItems(bank) : [],
      },
      {
        name: "QR Code",
        list: qrcode ? this.processItems(qrcode) : [],
      },
      {
        name: "Transfer",
        list: transfer ? this.processItems(transfer) : [],
      },
      {
        name: "Over-The-Counter",
        list: overTheCounter ? this.processItems(overTheCounter) : [],
      },
    ];

    // 过滤掉空列表
    result = result.filter((item) => item.list.length > 0);

    return result;
  }

  static processItems(listData: EWallets[] | undefined): PaymentMethodItemType[] {
    const list = listData || [];
    return list.map((item) => ({
      type: item["shoe"],
      name: item["cruelly"],
      logo: item["behave"],
      status: item["voluntary"], // 状态, 1:可用, 0:维护中
    }));
  }
}

export { RepaymentMethodsData };
export type { PaymentMethodItemType };
