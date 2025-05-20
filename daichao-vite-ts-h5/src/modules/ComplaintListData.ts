interface ComplaintItemFun {
  id?: number | string;
  time?: string;
  status?: string | number;
  statusDes?: string;
  type?: string | number;
  content?: string;
  shouldReFeedback?: 0 | 1;
}

interface TabData {
  title?: string;
  id?: number;
  list?: ComplaintItemFun[] | null;
}

interface ComplaintItem {
  ["pitiable"]: string | number; // Complaint ID
  ["exceeded"]: string; // Timestamp
  ["voluntary"]: string | number; // Status code
  ["blots"]: string; // Status description
  ["shoe"]: string; // Complaint type
  ["hates"]: string; // Complaint content
  ["writes"]: 0 | 1; // Needs additional info (0: no, 1: yes)
}

interface ComplaintTab {
  ["recreation"]: string; // Tab title
  ["pitiable"]: number; // Tab ID
  ["roses"]: ComplaintItem[]; // List of complaints
}

interface ComplaintData {
  ["rapidly"]: ComplaintTab[]; // Array of complaint tabs
}

class ComplaintListData {
  tabsData: TabData[] | null;

  constructor({ tabsData }: { tabsData?: TabData[] | null }) {
    this.tabsData = tabsData || null;
  }

  static parseJson(data?: ComplaintData): ComplaintListData | null {
    if (!data) return null;

    return new ComplaintListData({
      tabsData: this.processTabsData(data["rapidly"]),
    });
  }

  static processTabsData(data?: ComplaintTab[]): TabData[] | null {
    if (!data) return null;

    return data.map((item) => ({
      title: item["recreation"],
      id: item["pitiable"],
      list: this.processComplaintDataList(item["roses"]),
    }));
  }

  static processComplaintDataList(
    data?: Array<{
      pitiable?: string | number;
      exceeded?: string;
      voluntary?: string | number;
      blots?: string;
      shoe?: string | number;
      hates?: string;
      writes?: 0 | 1;
    }>,
  ): ComplaintItemFun[] | null {
    if (!data) return null;

    return data.map((item) => ({
      id: item["pitiable"],
      time: item["exceeded"],
      status: item["voluntary"],
      statusDes: item["blots"],
      type: item["shoe"],
      content: item["hates"],
      shouldReFeedback: item["writes"],
    }));
  }
}

export { ComplaintListData };
export type { ComplaintItemFun, TabData };
