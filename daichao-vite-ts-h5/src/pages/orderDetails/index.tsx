import qs from "query-string";
import { FC, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { ProductAccessJump } from "@/utils/ProductAccessJump";
import { getQueryParams } from "@/utils/getQueryParams";
import nativeUtils from "@/utils/nativeUtils";

import { orderImages } from "@/assets/images";

import { fetchOrderDetails, submitGoogleRating } from "@/api";
import { Container, ProductItem, ScoreModal, ScoreResultModal, Toast } from "@/components";
import mock_orderDetail from "@/mock/mock_orderDetail.json";
import { OrderDetailsData } from "@/modules/OrderDetailsData";
import { RouterConfig } from "@/router/routerConfig";
import { setPageTitle } from "@/utils";

import { OrderStatus } from "./component/OrderStatus";

const TopContent = styled.div<{ $status: boolean }>`
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

const AccessProductContent = styled.div`
  background: linear-gradient(112deg, #f1f2ff 0%, #ffffff 100%);
  border-radius: 1rem;
  border: 1px solid #ededf5;

  padding: 0.5rem 0.75rem 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;
const AccessTitleContent = styled.div``;
const AccessTitle = styled(OrderNum)`
  color: #30294c;
  text-align: left;
`;
const AccessIcon = styled.div`
  margin-top: 0.25rem;
  width: 1.3rem;
  height: 0.25rem;
  background: #6a52c9;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`;

const ListMore = styled.div`
  align-self: center;
  width: 20%;
  background: #f0f1fa;
  border-radius: 0.65rem;
  padding: 0.2rem 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Helvetica;
  font-size: 0.7rem;
  color: #a8afcf;
  line-height: 0.9rem;
  text-align: right;
  font-style: normal;
`;

const MaximumAmountContent = styled.div`
  width: 100%;
  height: 10.7rem;
  background-image: url(${orderImages.MAX_AMOUNT});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  padding: 5.5rem 0 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;

  position: relative;
`;

const MaxTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.7rem;
  color: #9195d7;
  line-height: 0.85rem;
  text-align: left;
  font-style: normal;
`;

const MaxAmount = styled.div`
  font-family: DINAlternate, DINAlternate;
  font-weight: bold;
  font-size: 2.5rem;
  color: #403a7a;
  line-height: 2.9rem;
  text-align: center;
  font-style: normal;
  z-index: 10;
`;

const MaxBg = styled.div`
  position: absolute;
  bottom: 0.8rem;
  width: 13.5rem;
  height: 1.8rem;
  background: #ffecd4;
`;

const NotQualificationContent = styled.div`
  width: 100%;

  background: linear-gradient(112deg, #f1f2ff 0%, #ffffff 100%);
  border-radius: 1rem;
  border: 1px solid #edf0f7;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.15rem;

  padding: 2rem 0.25rem 1.15rem;
`;
const NotImg = styled.img`
  width: 7.85rem;
  height: 6.4rem;
  flex-shrink: 0;
`;
const NotSubTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.6rem;
  color: #000000;
  line-height: 0.9rem;
  text-align: center;
  font-style: normal;
`;

const BottomButtonContent = styled.div`
  position: fixed;
  bottom: 1.6rem;
  left: 0;
  right: 0;

  width: 100%;
  padding: 0 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HomeButton = styled.div<{ $retryCard?: boolean }>`
  height: 2.5rem;
  background: ${(props) =>
    props.$retryCard ? "#FFFFFF" : "linear-gradient(135deg, #3d3bb4 0%, #a672e6 100%)"};
  box-shadow: 0px 2px 4px 0px #bcb7e5;
  border-radius: 1.25rem;
  border: ${(props) =>
    props.$retryCard ? "1px solid #6A52C9" : "0.15rem solid rgba(214, 225, 218, 0.26)"};

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => (props.$retryCard ? "#6A52C9" : "#ffd737")};
  line-height: 1.2rem;
  text-align: center;
  font-style: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderDetails: FC = () => {
  const location = useLocation();
  const prevLocationRef = useRef(location);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [data, setData] = useState<OrderDetailsData | null>();
  const [orderStatus, setOrderStatus] = useState<number>(0);
  // 推荐产品逻辑：订单审核中、放款中展示 21， 151
  const [RecomList, setRecomList] = useState<boolean>(false);
  const [Qualification, setQualification] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scoreModalVisible, setScoreModalVisible] = useState<boolean>(false);
  const [scoreResModalVisible, setScoreResModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === prevLocationRef.current.pathname) {
      if (location.search !== prevLocationRef.current.search) {
        getOrderDetails();
      }
    }
    prevLocationRef.current = location;
  }, [location, location.pathname, location.search]);

  useEffect(() => {
    setPageTitle("Loan details");
    getOrderDetails();
  }, []);

  // 获取订单详情数据
  const getOrderDetails = async (showLoading = true) => {
    if (showLoading) Toast.showLoading("loading...");
    try {
      const res = await fetchOrderDetails();
      const _data = OrderDetailsData.parseJson(res.data || mock_orderDetail);
      Toast.clear();
      setIsLoading(false);
      setData(_data);
      setOrderStatus(_data?.orderStatusData.orderStatus || 0);
      setRecomList(
        _data?.orderStatusData.orderStatus == 21 ||
          (_data?.orderStatusData.orderStatus == 151 &&
            Object.keys(_data?.loanFailed || {})?.length == 0),
      );
      setQualification(_data?.orderStatusData.orderStatus == 110 && _data?.recProducts.length == 0);
      setScoreModalVisible(_data?.scoreModalVisible || false);
      console.log(_data);
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
    if (data && data?.buttonsData.h5Url != "") {
      window.location.href = data.buttonsData.h5Url;
    } else {
      const params = getQueryParams();
      window.location.href = `#${RouterConfig.REPAYMENT_OF_PERIOD}?${qs.stringify(params)}`;
    }
  };

  const handleScoreSubmit = async (index: number) => {
    console.log(index);
    if (index == 0) {
      Toast.show("Please choose");
      return;
    }

    Toast.showLoading("loading...");
    try {
      await submitGoogleRating(index);
      Toast.clear();
      if (index >= 4) {
        nativeUtils.toGrade();
      }
      setScoreModalVisible(false);
      setScoreResModalVisible(index < 4);
    } catch (error) {
      if (error instanceof Error) {
        Toast.fail(error.message);
      } else if (typeof error === "string") {
        Toast.fail(error);
      } else {
        Toast.fail("发生未知错误");
      }
    }
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <Container>
      <TopContent $status={[21, 151, 200].includes(orderStatus) && !data?.isReCard}>
        <OrderStatusContent>
          <OrderStatus
            endTime={data?.countdownData?.expireTime}
            data={data?.orderStatusData}
            status={[21, 151, 200].includes(orderStatus) && !data?.isReCard}
            onTick={() => getOrderDetails(false)}
          />
          <OrderIcon src={orderImages.ORDER_ICON} />
        </OrderStatusContent>
        <ProductContent $status={[21, 151, 200].includes(orderStatus) && !data?.isReCard}>
          <ProductBox>
            <ProductInfo>
              <ProductLogo src={data?.orderDetailsData.productLogo} />
              <ProductName>{subStrName(data?.orderDetailsData.productName, 10, 7)}</ProductName>
            </ProductInfo>
            <OrderBox>
              <OrderTitle>Order Number</OrderTitle>
              <OrderNum>{subStrName(data?.orderNo, 20, 17)}</OrderNum>
            </OrderBox>
          </ProductBox>
          <AmountBox>
            <LoanAmount $status={[21, 151, 200].includes(orderStatus) && !data?.isReCard}>
              <LoanTitle>Loan Amount</LoanTitle>
              <Amount>{data?.orderDetailsData.orderAmount}</Amount>
            </LoanAmount>
            <AmountRight>
              <AdvanceBox>
                <AdvanceTitle>Advance service charge</AdvanceTitle>
                <AdvanceValue>{data?.orderDetailsData.detail?.[1].value}</AdvanceValue>
              </AdvanceBox>
              <AccountBox>
                <AdvanceTitle>Withdrawal Account</AdvanceTitle>
                <AdvanceValue>{data?.orderDetailsData.detail?.[3].value}</AdvanceValue>
              </AccountBox>
            </AmountRight>
          </AmountBox>
        </ProductContent>
        {!data?.isReCard && data?.buttonsData && [174, 180].includes(orderStatus) && (
          <ButtonsContent>
            {data?.buttonsData.isDelay && (
              <ExtensionButton onClick={() => handleExtensionButtonClick()}>
                Extension
              </ExtensionButton>
            )}
            <RepayButton onClick={() => handleRepayButtonClick()}>Repay</RepayButton>
          </ButtonsContent>
        )}
      </TopContent>
      {RecomList &&
        data?.easterEggInfo.distProducts &&
        data?.easterEggInfo.distProducts.length > 0 && (
          <AccessProductContent>
            <AccessTitleContent>
              <AccessTitle>{data?.easterEggInfo.subTitle}</AccessTitle>
              <AccessIcon />
            </AccessTitleContent>
            <ProductList>
              {data?.easterEggInfo.distProducts?.map((item, index) => {
                if (showMore || index < 3) {
                  return (
                    <ProductItem
                      index={index}
                      key={`${item.productName}-${index}`}
                      productLogo={item.productLogo}
                      productName={item.productName}
                      buttonStatus={item.buttonStatus}
                      amount={item.amount}
                      loanTerms={item.loanTerms}
                      interestRate={item.interestRate}
                      buttonText={item.buttonText}
                      onClick={() => ProductAccessJump(item.productId, 5)}
                    />
                  );
                }
              })}
            </ProductList>
            <ListMore onClick={() => setShowMore(!showMore)}>
              {showMore ? "Close" : "More"}
            </ListMore>
          </AccessProductContent>
        )}
      {!data?.shouldDisplayEasterEgg &&
        data?.recProducts &&
        data?.recProducts.length > 0 &&
        !Qualification && (
          <AccessProductContent>
            <AccessTitleContent>
              <AccessTitle>Recommendation</AccessTitle>
              <AccessIcon />
            </AccessTitleContent>
            <ProductList>
              {data?.recProducts?.map((item, index) => (
                <ProductItem
                  index={index}
                  key={`${item.productName}-${index}`}
                  productLogo={item.productLogo}
                  productName={item.productName}
                  buttonStatus={item.buttonStatus}
                  amount={item.amount}
                  loanTerms={item.loanTerms}
                  interestRate={item.interestRate}
                  buttonText={item.buttonText}
                  onClick={() => ProductAccessJump(item.id, 5)}
                />
              ))}
            </ProductList>
          </AccessProductContent>
        )}
      {Qualification && (
        <NotQualificationContent>
          <NotImg src={orderImages.NOT_ICON} />
          <NotSubTitle>
            Please try again later. Please maintain your credit well, which will be more helpful for
            your application to be approved.
          </NotSubTitle>
        </NotQualificationContent>
      )}
      {data?.shouldDisplayLoanExcitation && (
        <MaximumAmountContent>
          <MaxTitle>Maximum Credit amount</MaxTitle>
          <MaxAmount>{data?.loanExcitationData.loanAmountAsExpect}</MaxAmount>
          <MaxBg />
        </MaximumAmountContent>
      )}

      {data?.isReCard && data?.loanFailed && (
        <BottomButtonContent>
          {data?.loanFailed.retryCard && data.loanFailed.retryCard.ifShow == 1 && (
            <HomeButton $retryCard onClick={() => nativeUtils.retryOrderDialog(data.orderNo)}>
              {data.loanFailed.retryCard.buttonText}
            </HomeButton>
          )}
          {data?.loanFailed.changeCard && data.loanFailed.changeCard.ifShow == 1 && (
            <HomeButton onClick={() => nativeUtils.changeAccount(data.orderNo)}>{data?.loanFailed.changeCard.buttonText}</HomeButton>
          )}
        </BottomButtonContent>
      )}

      {(Qualification || (!data?.isReCard && data?.buttonsData)) && (
        <BottomButtonContent>
          {Qualification && <HomeButton onClick={() => nativeUtils.jumpToHome()}>Back To Home</HomeButton>}
          {[200, 999].includes(orderStatus) && (
            <HomeButton onClick={() => ProductAccessJump("", 8)}>Apply It Again</HomeButton>
          )}
        </BottomButtonContent>
      )}

      {/* 评分弹窗 */}
      <ScoreModal
        visible={scoreModalVisible}
        onClose={() => setScoreModalVisible(false)}
        onSubmit={(val: number) => handleScoreSubmit(val)}
      />

      {/* 评分结果弹窗 */}
      <ScoreResultModal
        visible={scoreResModalVisible}
        onClose={() => setScoreResModalVisible(false)}
      />
    </Container>
  );
};

export { OrderDetails };
