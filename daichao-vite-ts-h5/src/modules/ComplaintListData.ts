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

interface ComplaintItemFunTypes {
  id?: number | string;
  time?: string;
  status?: string | number;
  statusDes?: string;
  type?: string | number;
  content?: string;
  shouldReFeedback?: 0 | 1;
}

interface TabDataTypes {
  title?: string;
  id?: number;
  list?: ComplaintItemFunTypes[] | null;
}

class ComplaintListData {
  tabsData: TabDataTypes[] | null;

  constructor({ tabsData }: { tabsData?: TabDataTypes[] | null }) {
    this.tabsData = tabsData || null;
  }

  static parseJson(data?: ComplaintData): ComplaintListData | null {
    if (!data) return null;

    return new ComplaintListData({
      tabsData: this.processTabsData(data["rapidly"]),
    });
  }

  static processTabsData(data?: ComplaintTab[]): TabDataTypes[] | null {
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
  ): ComplaintItemFunTypes[] | null {
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
export type { ComplaintItemFunTypes, TabDataTypes };
