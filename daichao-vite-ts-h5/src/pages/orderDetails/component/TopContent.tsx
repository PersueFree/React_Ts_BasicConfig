import qs from "query-string";
import { FC } from "react";
import styled from "styled-components";

import { getQueryParams } from "@/utils/getQueryParams";

import { orderImages } from "@/assets/images";

import {
  ButtonsDataTypes,
  OrderDetailsContentTypes,
  OrderStatusDataTypes,
} from "@/modules/OrderDetailsData";
import { RouterConfig } from "@/router/routerConfig";

import { OrderStatus } from "./OrderStatus";

const ContainerPage = styled.div<{ $status: boolean }>`
  width: 100%;
  background: ${(props) =>
    props.$status ? props.theme.colors.orderNormalBg : props.theme.colors.orderABNormalBg};
  border-radius: 1.1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderStatusContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const OrderIcon = styled.img`
  width: 4.1rem;
  height: 3rem;
  flex-shrink: 0;
  margin-right: -0.15rem;
`;

const ProductContent = styled.div<{ $status: boolean }>`
  width: 100%;
  height: 8.5rem;
  background-image: url(${(props) =>
    props.$status ? orderImages.PRODUCT_BG : orderImages.REPAYPRODUCT_BG});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  padding: 0.45rem 0.45rem 1.1rem 0.95rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProductBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductInfo = styled.div`
  margin-top: 0.5rem;
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
const OrderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const AmountBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 0.45rem;
`;
const LoanAmount = styled.div<{ $status: boolean }>`
  width: 5.45rem;
  background-image: url(${(props) =>
    props.$status ? orderImages.AMOUNT_BG : orderImages.REPAYAMOUNT_BG});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  padding: 0.35rem 0 0.95rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;
const LoanTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.6rem;
  color: #ffffff;
  line-height: 0.7rem;
  text-align: left;
  font-style: normal;
`;
const Amount = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1.1rem;
  color: #333333;
  line-height: 1.3rem;
  text-align: left;
  font-style: normal;
`;
const AmountRight = styled.div`
  max-width: 7rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const OrderTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #999999;
  line-height: 0.6rem;
  text-align: right;
  font-style: normal;
`;
const OrderNum = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: normal;
  font-size: 0.7rem;
  color: #333333;
  line-height: 0.85rem;
  text-align: right;
  font-style: oblique;
`;

const AdvanceBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #fffae4;
  border-radius: 0.3rem;

  padding: 0.25rem 0.55rem 0.3rem;
`;

const AccountBox = styled(AdvanceBox)``;
const AdvanceTitle = styled(OrderTitle)`
  color: #c9b970;
  text-align: left;
`;
const AdvanceValue = styled(OrderNum)`
  margin-top: 0.1rem;
  font-weight: bold;
  text-align: left;
  font-style: normal;
`;

const ButtonsContent = styled.div`
  width: 100%;
  display: flex;
  gap: 0.55rem;
  height: 2.5rem;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1rem;
  line-height: 2.5rem;
  text-align: center;
  font-style: normal;
`;

const ExtensionButton = styled.div`
  flex: 1;
  border-radius: 1.25rem;
  background: #ffffff;

  color: #ffd737;
`;
const RepayButton = styled.div`
  flex: 1;
  border-radius: 1.25rem;
  background: #ff7a00;

  color: #ffffff;
`;

interface TopContentTypes {
  status: boolean;
  isReCard?: boolean;
  expireTime?: number;
  orderStatusData?: OrderStatusDataTypes;
  orderNo?: string;
  buttonsData?: ButtonsDataTypes;
  orderStatus: number;
  orderDetailsData?: OrderDetailsContentTypes | Record<string, never>;
  getOrderDetails: (showLoading: boolean) => Promise<void>;
}

const TopContent: FC<TopContentTypes> = ({
  status,
  expireTime,
  orderStatusData,
  orderNo,
  isReCard,
  buttonsData,
  orderStatus,
  orderDetailsData,
  getOrderDetails,
}) => {
  const subStrName = (value: number | string | undefined, star: number, end: number) => {
    const _value = String(value);
    if (_value.length > star) {
      return _value.substring(0, end) + "...";
    } else {
      return _value;
    }
  };

  // 展期页面
  const handleExtensionButtonClick = () => {
    const params = getQueryParams();
    window.location.href = `#${RouterConfig.REPAYMENT_OF_DELAY}?${qs.stringify(params)}`;
  };

  // 立即还款
  const handleRepayButtonClick = () => {
    if (buttonsData?.h5Url) {
      window.location.href = buttonsData.h5Url ?? "";
    } else {
      const params = getQueryParams();
      window.location.href = `#${RouterConfig.REPAYMENT_OF_PERIOD}?${qs.stringify(params)}`;
    }
  };

  return (
    <ContainerPage $status={status}>
      <OrderStatusContent>
        <OrderStatus
          endTime={expireTime}
          data={orderStatusData}
          status={status}
          onTick={() => getOrderDetails(false)}
        />
        <OrderIcon src={orderImages.ORDER_ICON} />
      </OrderStatusContent>
      <ProductContent $status={status}>
        <ProductBox>
          <ProductInfo>
            <ProductLogo src={orderDetailsData?.productLogo} />
            <ProductName>{subStrName(orderDetailsData?.productName, 10, 7)}</ProductName>
          </ProductInfo>
          <OrderBox>
            <OrderTitle>Order Number</OrderTitle>
            <OrderNum>{subStrName(orderNo, 20, 17)}</OrderNum>
          </OrderBox>
        </ProductBox>
        <AmountBox>
          <LoanAmount $status={status}>
            <LoanTitle>Loan Amount</LoanTitle>
            <Amount>{orderDetailsData?.orderAmount}</Amount>
          </LoanAmount>
          <AmountRight>
            <AdvanceBox>
              <AdvanceTitle>Advance service charge</AdvanceTitle>
              <AdvanceValue>{orderDetailsData?.detail?.[1].value}</AdvanceValue>
            </AdvanceBox>
            <AccountBox>
              <AdvanceTitle>Withdrawal Account</AdvanceTitle>
              <AdvanceValue>{orderDetailsData?.detail?.[3].value}</AdvanceValue>
            </AccountBox>
          </AmountRight>
        </AmountBox>
      </ProductContent>
      {!isReCard && buttonsData && [174, 180].includes(orderStatus) && (
        <ButtonsContent>
          {buttonsData.isDelay && (
            <ExtensionButton onClick={() => handleExtensionButtonClick()}>
              Extension
            </ExtensionButton>
          )}
          <RepayButton onClick={() => handleRepayButtonClick()}>Repay</RepayButton>
        </ButtonsContent>
      )}
    </ContainerPage>
  );
};

export { TopContent };
