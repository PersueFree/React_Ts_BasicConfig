import { Mask } from "antd-mobile";
import qs from "query-string";
import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { getQueryParams } from "@/utils/getQueryParams";

import { fetchSingleRepayDetails } from "@/api";
import { Container, DateComponent, Toast } from "@/components";
import { SingleRepaymentDate } from "@/modules/SingleRepaymentDate";
import { RouterConfig } from "@/router/routerConfig";
import { numFormat, setPageTitle } from "@/utils";

import { InstallmentItem, PopupComponent } from "./component";
import type { DueDateProps, PopupProps } from "./type";

const RepayContent = styled.div`
  background: #f1f2ff;
  border-radius: 1rem;
  border: 1px solid #f1f2ff;

  padding: 0.6rem 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const AppInfoContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const ProductLogo = styled.img`
  background: #ffffff;
  border-radius: 0.2rem;
  border: 1px solid #e0e1f7;

  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
`;
const ProductName = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: #000000;
  line-height: 0.8rem;
  text-align: center;
  font-style: normal;
  text-transform: uppercase;
`;
const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;
const OrderTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #999999;
  line-height: 0.6rem;
  text-align: right;
  font-style: normal;
`;
const OrderNumber = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: normal;
  font-size: 0.7rem;
  color: #333333;
  line-height: 0.85rem;
  text-align: right;
  font-style: oblique;
`;
const InstallmentContent = styled.div`
  border-radius: 0.75rem;
  background: #ffffff;
  border: 1px solid #ebebf8;
`;

const BottomContent = styled.div`
  position: fixed;
  bottom: 1.6rem;
  left: 0;
  right: 0;

  width: 100%;
  background: #ffffff;
  box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.12);
  padding: 0.8rem 0.75rem 1.25rem;

  display: flex;
`;
const TotalAmountContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const TotalAmountTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.6rem;
  color: #999999;
  line-height: 1rem;
  text-align: left;
  font-style: normal;
`;
const TotalAmount = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1.1rem;
  color: #ff7a00;
  line-height: 1rem;
  text-align: left;
  font-style: normal;
`;
const Button = styled.div`
  flex: 1;
  height: 2.5rem;
  background: linear-gradient(135deg, #3d3bb4 0%, #a672e6 100%);
  box-shadow: 0px 2px 4px 0px #bcb7e5;
  border-radius: 1.25rem;
  border: 0.15rem solid rgba(214, 225, 218, 0.26);

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1rem;
  color: #ffd737;
  line-height: 1.2rem;
  text-align: center;
  font-style: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 15rem;
  margin: 0 auto;
  margin-top: 50%;
  background: #ffffff;
  border-radius: 1rem;
  padding: 0.7rem 0 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ModalTitle = styled.div`
  font-weight: 550;
  font-size: 0.9rem;
  color: #2a2a29;
  text-align: center;
  font-style: normal;
  padding: 0 1.5rem;
  max-height: 4rem;
  overflow: hidden;
  word-wrap: break-word;
  text-overflow: ellipsis;
  margin-bottom: 0.8rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -ms-text-overflow: ellipsis;
`;
const ModalDesc = styled.div`
  font-size: 0.8rem;
  color: #6b6b6a;
  line-height: 1rem;
  text-align: center;
  font-style: normal;
  word-wrap: break-word;
  padding: 0 0.9rem;
  margin-bottom: 1.2rem;
  max-height: 10rem;
  overflow-y: auto;
`;
const ModalButton = styled.div`
  width: 100%;
  height: 2.5rem;
  border-top: 1px solid #d7d7e7;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.9rem;
  color: #000000;
  text-align: center;
  font-style: normal;
`;

const SinglePeriodRepayment: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<Partial<PopupProps>>();
  const [repaymentData, setRepaymentData] = useState<SingleRepaymentDate | null>();
  const [dueDate, setDueDate] = useState<Partial<DueDateProps>>();
  const [finalAmount, setFinalAmount] = useState<string | number | undefined>(0);
  const [paymentData, setPaymentData] = useState<SingleRepaymentDate["repaymentSchedules"]>([]);
  const [crossIndex, setCrossIndex] = useState<number | null>(null);

  useEffect(() => {
    setPageTitle("Repayment Details");
    getRepaymentData();
  }, []);

  const getRepaymentData = async () => {
    Toast.showLoading("loading...");
    try {
      const res = await fetchSingleRepayDetails();
      const _data = SingleRepaymentDate.parseJson(res.data);
      Toast.clear();
      setRepaymentData(_data);
      setPaymentData(_data?.repaymentSchedules || []);
      splitDateDigits(_data?.repayDay, _data?.overdueDay);
      calcRepayment(_data?.repaymentSchedules);
      console.log(_data);
    } catch (error) {
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

  // 拆分日期数字
  const splitDateDigits = (dateStr?: string, dueDay?: number) => {
    if (!dateStr) return;
    let daysDiff;
    if (dueDay == 0) {
      daysDiff = getDaysRemaining(dateStr);
    }
    const [day, month] = dateStr.split("-");

    const monthDigits = month.split("");
    const dayDigits = day.split("");

    setDueDate({
      monthTen: monthDigits[0],
      monthUnits: monthDigits[1],
      dayTen: dayDigits[0],
      dayUnits: dayDigits[1],
      daysDiff,
    });
  };
  // 计算日期差值天数
  const getDaysRemaining = (targetDateStr: string): number => {
    const [day, month, year] = targetDateStr.split("-").map(Number);
    const targetDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  // 计算还款金额
  const calcRepayment = useCallback(
    (data = paymentData) => {
      const total = numFormat(
        data.reduce((pre, val) => {
          return pre + (val.selected && val.canClick != 0 ? val.paymentAmount : 0);
        }, 0),
      );
      setFinalAmount(total);
      return total;
    },
    [paymentData],
  );

  // 选择还款
  const handleSelectClick = (
    item: SingleRepaymentDate["repaymentSchedules"][0],
    index: number,
  ): void => {
    if (!item.selected) {
      if (item.canClick != 0) {
        item.selected = 1;
      }

      const isExist = paymentData
        ?.slice(0, index)
        .some((item) => item.selected == 0 && item.canClick != 0);

      if (isExist) {
        setCrossIndex(index);
        setModalVisible(true);
      }

      calcRepayment();
    } else {
      paymentData?.slice(index).forEach((item) => {
        item.selected = 0;
      });

      calcRepayment();
    }
  };

  // 跨选弹窗
  const handleConfirmClick = () => {
    if (crossIndex == null) {
      return;
    }
    paymentData.slice(0, crossIndex).forEach((item) => {
      item.selected = 1;
    });

    setModalVisible(false);
    setCrossIndex(null);
    calcRepayment();
  };

  // 立即还款
  const handleConfirmButtonClick = () => {
    if (finalAmount == 0) {
      return;
    }
    localStorage.removeItem("payType");
    localStorage.removeItem("payCode");
    localStorage.removeItem("specificNum");
    localStorage.setItem("isDefault", "1");

    const paramsString = qs.stringify({
      ...getQueryParams(),
      amount: finalAmount?.toString().split(",").join(""),
    });

    window.location.href = `#${RouterConfig.REPAYMENT_METHODS}?${paramsString}`;
  };

  return (
    <Container $paddingBottom='8rem'>
      <DateComponent isOverdue={repaymentData?.overdueDay} data={dueDate} />

      <RepayContent>
        <AppInfoContent>
          <ProductInfo>
            <ProductLogo src={repaymentData?.productLogo} />
            <ProductName>{repaymentData?.productName}</ProductName>
          </ProductInfo>
          <OrderInfo>
            <OrderTitle>Order Number</OrderTitle>
            <OrderNumber>{repaymentData?.orderNo}</OrderNumber>
          </OrderInfo>
        </AppInfoContent>

        <InstallmentContent>
          {repaymentData?.repaymentSchedules &&
            repaymentData.repaymentSchedules.map((item, index) => {
              const isOverdue = item.periodStatus == 500;
              const NoClick = item.canClick != 1;
              return (
                <InstallmentItem
                  index={index}
                  key={`${item.repayDes}-${index}`}
                  item={item}
                  note={repaymentData?.note}
                  isOverdue={isOverdue}
                  NoClick={NoClick}
                  onSelectClick={() => handleSelectClick(item, index)}
                  onPopupClick={() =>
                    setPopupVisible({
                      visible: true,
                      dueTime: item.dueTime,
                      displayPaymentAmount: item.displayPaymentAmount,
                      loanPrincipal: item.loanPrincipal,
                      repayInterest: item.repayInterest,
                      overdueFee: item.overdueFee,
                      repaidAmount: item.repaidAmount,
                      periodNo: item.periodNo,
                      periodStatus: item.periodStatus == 500,
                    })
                  }
                />
              );
            })}
        </InstallmentContent>
      </RepayContent>

      <BottomContent>
        <TotalAmountContent>
          <TotalAmountTitle>Total amount</TotalAmountTitle>
          <TotalAmount>₱ {finalAmount}</TotalAmount>
        </TotalAmountContent>
        <Button onClick={() => handleConfirmButtonClick()}>Repay</Button>
      </BottomContent>

      <PopupComponent
        popupVisible={popupVisible}
        onClose={() => setPopupVisible({ visible: false })}
      />

      <Mask visible={modalVisible} destroyOnClose={true}>
        <ModalContainer>
          <ModalTitle>Tips</ModalTitle>
          <ModalDesc>
            Skip repayment is not allowed, the repayments before the current period must be settled
            together.
          </ModalDesc>
          <ModalButton onClick={() => handleConfirmClick()}>Confirm</ModalButton>
        </ModalContainer>
      </Mask>
    </Container>
  );
};

export { SinglePeriodRepayment };
