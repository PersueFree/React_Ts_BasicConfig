import qs from "query-string";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { getQueryParams } from "@/utils/getQueryParams";

import { fetchExtendedRepayDetails } from "@/api";
import { Container, Toast } from "@/components";
// import mock_extendedRepayment from "@/mock/mock_extendedRepayment.json";
import { ExtendedRepaymentData } from "@/modules/ExtendedRepaymentData";
import { RouterConfig } from "@/router/routerConfig";
import { setPageTitle } from "@/utils";

const TopContent = styled.div<{ $isOverdue: boolean }>`
  width: 100%;
  background: ${(props) =>
    props.$isOverdue ? props.theme.colors.orderABNormalBg : props.theme.colors.orderNormalBg};
  border-radius: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.55rem;
`;
const Title = styled.div`
  font-family: Helvetica;
  font-size: 0.7rem;
  color: #ffffff;
  line-height: 0.8rem;
  text-align: left;
  font-style: normal;
  text-transform: none;

  padding: 0.75rem 0 0.2rem;
`;
const DateContent = styled.div`
  display: flex;

  gap: 0.5rem;
`;
const DateItemBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 0.5rem;
`;
const DateType = styled.div`
  border-bottom: 0.05rem solid #ffb84a;
  padding: 0.35rem 0;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.5rem;
  color: #d8c9bb;
  line-height: 0.6rem;
  text-align: center;
  font-style: normal;
`;
const DateItem = styled.div`
  padding: 0.6rem 1rem;

  display: flex;
  gap: 0.25rem;
`;
const Item = styled.div<{ $isOverdue?: boolean }>`
  padding: 0.2rem 0.55rem;
  background: ${(props) => (props.$isOverdue ? "#ff7a00" : "#69E1D2")};
  border-radius: 0.25rem;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1.8rem;
  color: ${(props) => (props.$isOverdue ? "#fffed0" : "#115560")};
  line-height: 2.15rem;
  text-align: center;
  font-style: normal;
`;
const TipContent = styled.div`
  padding: 0.55rem 2.15rem;
  background: rgba(255, 255, 255, 0.32);

  font-family: Helvetica;
  font-size: 0.6rem;
  color: #333333;
  line-height: 0.8rem;
  text-align: center;
  font-style: normal;
  text-transform: none;
`;

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
const InstallmentList = styled.div`
  width: 100%;
  border-bottom: 1px dashed #edf0f7;
  position: relative;

  padding: 0.75rem 0.5rem;

  &::before,
  &::after {
    content: "";
    width: 1rem;
    height: 1rem;
    background: #f1f2ff;
    border-radius: 0.5rem;
  }
  &::before {
    left: -0.5rem;
    bottom: -0.5rem;
    position: absolute;
  }
  &::after {
    right: -0.5rem;
    bottom: -0.5rem;
    position: absolute;
  }
  &:last-child::before,
  &:last-child::after {
    display: none;
  }
  &:last-child {
    border-bottom: none;
  }
`;
const AccessTitleContent = styled.div``;
const AccessTitle = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: normal;
  font-size: 0.7rem;
  line-height: 0.85rem;
  font-style: oblique;
  color: #30294c;
  text-align: left;
`;
const AccessIcon = styled.div`
  margin-top: 0.25rem;
  width: 1.3rem;
  height: 0.25rem;
  background: #6a52c9;
`;
const RepayDateInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const BottomInstallContent = styled.div`
  margin-top: 0.55rem;
  background: #ffffff;
  border-radius: 0.5rem;
  border: 1px solid #edf0f7;

  padding: 0.5rem 0.3rem 0.5rem 0.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const DueDateContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const DueDateTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #999999;
  line-height: 0.6rem;
  text-align: left;
  font-style: normal;
`;
const DueDateValue = styled.div<{ $isOverdue?: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: ${(props) => (props.$isOverdue ? "#ff7a00" : "#333333")};
  line-height: 0.85rem;
  text-align: left;
  font-style: normal;
`;
const RepayAmountContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;
const AmountTitle = styled(DueDateTitle)``;
const AmountValue = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: #333333;
  line-height: 0.85rem;
  text-align: left;
  font-style: normal;
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

interface DueDateProps {
  monthTen: string;
  monthUnits: string;
  dayTen: string;
  dayUnits: string;
  daysDiff?: number;
}

const ExtendedRepayment: FC = () => {
  const [extendRepaymentData, setExtendRepaymentData] = useState<ExtendedRepaymentData | null>();
  const [dueDate, setDueDate] = useState<Partial<DueDateProps>>();
  const [paymentAmountData, setPaymentAmountData] =
    useState<ExtendedRepaymentData["totalPaymentInfo"]>();

  useEffect(() => {
    setPageTitle("Repayment Details");
    getRepaymentData();
  }, []);

  const getRepaymentData = async () => {
    Toast.showLoading("loading...");
    try {
      const res = await fetchExtendedRepayDetails();
      const _data = ExtendedRepaymentData.parseJson(res.data);
      Toast.clear();
      setExtendRepaymentData(_data);
      setPaymentAmountData(_data?.totalPaymentInfo);
      splitDateDigits(_data?.repayDate, _data?.overdueDay);
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

  // 立即还款
  const handleConfirmButtonClick = () => {
    localStorage.removeItem("payType");
    localStorage.removeItem("payCode");
    localStorage.removeItem("specificNum");
    localStorage.setItem("isDefault", "1");

    const paramsString = qs.stringify({
      ...getQueryParams(),
      display: 1,
    });

    window.location.href = `#${RouterConfig.REPAYMENT_METHODS}?amount=${parseInt(extendRepaymentData?.repaymentAmount || "0")}&${paramsString}`;
  };

  return (
    <Container $paddingBottom='8rem'>
      <TopContent $isOverdue={!!extendRepaymentData?.overdueDay}>
        <Title>Current due date</Title>
        <DateContent>
          <DateItemBox>
            <DateType>Mouth</DateType>
            <DateItem>
              <Item $isOverdue={!!extendRepaymentData?.overdueDay}>{dueDate?.monthTen}</Item>
              <Item $isOverdue={!!extendRepaymentData?.overdueDay}>{dueDate?.monthUnits}</Item>
            </DateItem>
          </DateItemBox>
          <DateItemBox>
            <DateType>Day</DateType>
            <DateItem>
              <Item $isOverdue={!!extendRepaymentData?.overdueDay}>{dueDate?.dayTen}</Item>
              <Item $isOverdue={!!extendRepaymentData?.overdueDay}>{dueDate?.dayUnits}</Item>
            </DateItem>
          </DateItemBox>
        </DateContent>
        <TipContent>
          The nearest due date has &nbsp;
          <span style={{ color: "#FF3D3D", fontWeight: "bold", fontStyle: "italic" }}>
            {extendRepaymentData?.overdueDay
              ? `overdue for ${extendRepaymentData?.overdueDay} days`
              : `There are still ${dueDate?.daysDiff} days left`}
          </span>
          . Extending will impact your credit.
        </TipContent>
      </TopContent>

      <RepayContent>
        <AppInfoContent>
          <ProductInfo>
            <ProductLogo src={extendRepaymentData?.productLogo} />
            <ProductName>{extendRepaymentData?.productName}</ProductName>
          </ProductInfo>
          <OrderInfo>
            <OrderTitle>Order Number</OrderTitle>
            <OrderNumber>{extendRepaymentData?.orderNo}</OrderNumber>
          </OrderInfo>
        </AppInfoContent>
        <InstallmentContent>
          <InstallmentList>
            <AccessTitleContent>
              <AccessTitle>Repayment schedule after extension success</AccessTitle>
              <AccessIcon />
            </AccessTitleContent>
            <BottomInstallContent>
              <DueDateContent>
                <DueDateTitle>
                  {extendRepaymentData?.repaymentDetailData?.[
                    extendRepaymentData?.repaymentDetailData.length - 1
                  ]?.text || "Expiration date after extension"}
                </DueDateTitle>
                <DueDateValue>{extendRepaymentData?.expiryTime}</DueDateValue>
              </DueDateContent>
              <RepayAmountContent>
                <AmountTitle>{extendRepaymentData?.repaymentAmountData?.text}</AmountTitle>
                <AmountValue>{extendRepaymentData?.repaymentAmountData?.value}</AmountValue>
              </RepayAmountContent>
            </BottomInstallContent>
          </InstallmentList>
          <InstallmentList>
            <AccessTitleContent>
              <AccessTitle>Extension fee</AccessTitle>
              <AccessIcon />
            </AccessTitleContent>
            <RepayDateInfoContent>
              {extendRepaymentData?.repaymentDetailData?.slice(0, -1)?.map((item, index) => (
                <BottomInstallContent key={`${item.text}-${index}`}>
                  <AmountTitle>{item?.text}</AmountTitle>
                  <AmountValue>{item?.value}</AmountValue>
                </BottomInstallContent>
              ))}
            </RepayDateInfoContent>
          </InstallmentList>
        </InstallmentContent>
      </RepayContent>

      <BottomContent>
        <TotalAmountContent>
          <TotalAmountTitle>{paymentAmountData?.displayTotalText}</TotalAmountTitle>
          <TotalAmount>{paymentAmountData?.displayTotalAmount}</TotalAmount>
        </TotalAmountContent>
        <Button onClick={() => handleConfirmButtonClick()}>Repay</Button>
      </BottomContent>
    </Container>
  );
};

export { ExtendedRepayment };
