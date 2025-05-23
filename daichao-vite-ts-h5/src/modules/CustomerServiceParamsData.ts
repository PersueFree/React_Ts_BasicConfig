// 原始数据接口（保持[""]写法）
interface RawStatusItem {
  ["recreation"]: string;
  ["impartial"]: number;
}

interface RawProblemTypeItem {
  ["recreation"]: string;
  ["impartial"]: number;
}

interface RawOrderDetailItem {
  ["recreation"]: string;
  ["impartial"]: string;
}

interface RawOrderItem {
  ["perforce"]: string;
  ["grace"]: string;
  ["voluntary"]: string;
  ["proceeding"]?: number;
  ["tempered"]: string;
  ["roses"]: RawOrderDetailItem[];
}

interface RawCustomerServiceData {
  ["prized"]: RawStatusItem[];
  ["execution"]: RawProblemTypeItem[];
  ["rapidity"]: RawOrderItem;
  ["modesty"]?: RawOrderItem[];
}

interface CommonItemTypes {
  title?: string;
  value?: string | number;
}

// 处理后数据接口
interface OrderItemTypes {
  orderNo?: string;
  productLogo?: string;
  productName?: string;
  status?: string;
  isShow?: number; // 与proceeding对应
  list?: Array<{
    title?: string;
    value?: string;
  }>;
}

class CustomerServiceParamsData {
  problemStatus?: CommonItemTypes[];
  problemType?: CommonItemTypes[];
  orderDetail?: OrderItemTypes;
  orderList?: OrderItemTypes[];

  constructor({
    problemStatus,
    problemType,
    orderDetail,
    orderList,
  }: {
    problemStatus?: CommonItemTypes[];
    problemType?: CommonItemTypes[];
    orderDetail?: OrderItemTypes;
    orderList?: OrderItemTypes[];
  } = {}) {
    this.problemStatus = problemStatus;
    this.problemType = problemType;
    this.orderDetail = orderDetail;
    this.orderList = orderList;
  }

  static parseJson(data?: RawCustomerServiceData): CustomerServiceParamsData | null {
    if (!data) return null;

    return new CustomerServiceParamsData({
      problemStatus: this.processStatus(data["prized"]),
      problemType: this.processProblemType(data["execution"]),
      orderDetail: this.processOrderItem(data["rapidity"]),
      orderList: data["modesty"]
        ?.map((item) => this.processOrderItem(item))
        .filter((item): item is OrderItemTypes => item !== undefined),
    });
  }

  private static processStatus(data?: RawStatusItem[]): CommonItemTypes[] | undefined {
    return data?.map((item) => ({
      title: item["recreation"],
      value: item["impartial"],
    }));
  }

  private static processProblemType(data?: RawProblemTypeItem[]): CommonItemTypes[] | undefined {
    return data?.map((item) => ({
      title: item["recreation"],
      value: item["impartial"],
    }));
  }

  private static processOrderItem(item?: RawOrderItem): OrderItemTypes | undefined {
    if (!item) return undefined;

    return {
      orderNo: item["tempered"],
      productLogo: item["perforce"],
      productName: item["grace"],
      status: item["voluntary"],
      isShow: item["proceeding"], // 保持number类型
      list: item["roses"]?.map((rose) => ({
        title: rose["recreation"],
        value: rose["impartial"],
      })),
    };
  }
}

export { CustomerServiceParamsData };
export type { OrderItemTypes, CommonItemTypes };
