import { FC, useEffect, useState } from "react";

import { getQueryParams } from "@/utils/getQueryParams";

import { complaintImage } from "@/assets/images";

import { AppConfig } from "@/AppConfig";
import { fetchCustomerServiceParams, fetchQuestionList } from "@/api";
import { Toast } from "@/components";
import { CustomerServiceParamsData } from "@/modules/CustomerServiceParamsData";
import type { OrderItemTypes } from "@/modules/CustomerServiceParamsData";
import type { AnswerTypes } from "@/modules/QuestionData";
import { QuestionData } from "@/modules/QuestionData";
import { RouterConfig } from "@/router/routerConfig";
import { setPageTitle } from "@/utils";

import "./ComplaintOrders.less";

interface OrderDetailsProps {
  order: OrderItemTypes;
}

interface OrderListProps {
  current: CustomerServiceParamsData["orderDetail"] | null;
  list: OrderItemTypes[] | null;
  visible: boolean;
  onClose: () => void;
  onSelect: (item: OrderItemTypes, index: number) => void;
}

const ComplaintOrders: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderListVisible, setOrderListVisible] = useState<boolean>(false);
  const [problemType, setProblemType] = useState<QuestionData["answerList"] | null>();
  const [orderDetail, setOrderDetail] = useState<CustomerServiceParamsData["orderDetail"] | null>();
  const [orderList, setOrderList] = useState<OrderItemTypes[] | null>();

  useEffect(() => {
    setPageTitle("Customer Service");
    fetchData();
  }, []);

  const fetchData = async () => {
    Toast.showLoading("loading...");

    const params = getQueryParams();
    const orderNo = localStorage.getItem("orderNo") || params.orderNo || "";

    try {
      const res1 = await fetchCustomerServiceParams(orderNo);
      const res2 = await fetchQuestionList(0, orderNo, "");

      Toast.clear();
      const data = CustomerServiceParamsData.parseJson(res1.data);
      const problemType = QuestionData.parseJson(res2.data)?.answerList;
      setIsLoading(false);
      setProblemType(problemType);
      setOrderDetail(data?.orderDetail);
      setOrderList(data?.orderList);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        Toast.fail(error.message);
      } else if (typeof error === "string") {
        Toast.fail(error);
      } else {
        Toast.fail("发生未知错误");
        console.error("捕获到非标准错误:", error);
      }
    }
  };

  // 选择投诉类型
  const handleSelectType = (item: AnswerTypes, index: number) => {
    const orderNo = orderDetail?.orderNo ?? "";
    localStorage.setItem("orderNo", orderNo);
    localStorage.setItem("selectedIndex", String(index));
    window.location.href = `#${RouterConfig.SMART_SERVICE}?selectedIndex=${index}&orderNo=${orderNo}`;
  };

  // 选择订单
  const handleOrderSelect = (item: OrderItemTypes, index: number) => {
    console.log("item", item, index);
    setOrderDetail(item);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div className='complainPage'>
      <section className='orderType'>
        <div className='orderDetail'>
          <div
            className='top'
            style={{
              display: orderList?.length == 0 ? "none" : "block",
              background: AppConfig.bgFontColor,
            }}
          >
            <span
              className='allOrder'
              onClick={() => setOrderListVisible(true)}
              style={{ color: AppConfig.bgFontColor }}
            >
              All
            </span>
          </div>
          {orderDetail && <OrderDetails order={orderDetail} />}
        </div>

        {problemType && (
          <QuestionTypeList
            list={problemType}
            onSelect={(item, index) => handleSelectType(item, index)}
          />
        )}
      </section>

      {orderList && orderList.length > 0 && (
        <OrderList
          visible={orderListVisible}
          onClose={() => setOrderListVisible(false)}
          current={orderDetail}
          list={orderList}
          onSelect={(item, index) => handleOrderSelect(item, index)}
        />
      )}
    </div>
  );
};

const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className='orderDetails'>
      <div className='topDetail'>
        <img src={order.productLogo} className='logo' alt='' />
        <span className='productName'>{order.productName}</span>
        <span className='status' style={{ color: AppConfig.bgFontColor }}>
          {order.status}
        </span>
      </div>
      <ul>
        {order.list &&
          order.list.length > 0 &&
          order.list.map((item, index) => {
            return (
              <li key={index} className='clearfix'>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const QuestionTypeList: FC<{ list: AnswerTypes[]; onSelect: (item: AnswerTypes, index: number) => void }> = ({
  list,
  onSelect,
}) => {
  return (
    <div className='complainTypeList'>
      <p>Select the type of issue</p>
      <ul>
        {list.map((item: AnswerTypes, index: number) => {
          return (
            <li key={index} onClick={() => onSelect(item, index)}>
              <img
                src={complaintImage.COMICON_1}
                style={{ display: index == 0 ? "block" : "none" }}
                alt=''
              />
              <img
                src={complaintImage.COMICON_2}
                style={{ display: index == 1 ? "block" : "none" }}
                alt=''
              />
              <img
                src={complaintImage.COMICON_3}
                style={{ display: index == 2 ? "block" : "none" }}
                alt=''
              />
              <img
                src={complaintImage.COMICON_4}
                style={{ display: index == 3 ? "block" : "none" }}
                alt=''
              />
              <p style={{ color: AppConfig.bgFontColor }}>{item.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const OrderList: FC<OrderListProps> = ({ current, list, visible, onClose, onSelect }) => {
  return (
    <div
      className='allOrdersWrap'
      onClick={() => onClose()}
      style={{ display: visible ? "block" : "none" }}
    >
      <div className='allOrderLists'>
        {list?.map((item, index) => {
          return (
            <div
              className='orderDetails'
              key={index}
              onClick={() => onSelect(item, index)}
              style={{
                borderColor: current?.orderNo == item.orderNo ? AppConfig.bgFontColor : "#ECEFF1",
              }}
            >
              <div className='topDetail'>
                <img src={item.productLogo} className='logo' alt='' />
                <span className='productName'>{item.productName}</span>
                <span className='status' style={{ color: AppConfig.bgFontColor }}>
                  {item.status}
                </span>
              </div>
              <ul>
                {item.list?.map((list, num) => {
                  return (
                    <li key={num}>
                      <span>{list.title}</span>
                      <span>{list.value}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ComplaintOrders };
