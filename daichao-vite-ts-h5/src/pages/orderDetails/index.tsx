import { FC, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { ProductAccessJump } from "@/utils/ProductAccessJump";
import nativeUtils from "@/utils/nativeUtils";

import { orderImages } from "@/assets/images";

import { fetchOrderDetails, submitGoogleRating } from "@/api";
import { Container, ProductItem, ScoreModal, ScoreResultModal, Toast } from "@/components";
import mock_orderDetail from "@/mock/mock_orderDetail.json";
import { OrderDetailsData } from "@/modules/OrderDetailsData";
import { setPageTitle } from "@/utils";

import { ProductComponent, TopContent } from "./component";

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
      <TopContent
        status={[21, 151, 200].includes(orderStatus) && !data?.isReCard}
        expireTime={data?.countdownData?.expireTime}
        orderStatusData={data?.orderStatusData}
        orderNo={data?.orderNo}
        isReCard={data?.isReCard}
        buttonsData={data?.buttonsData}
        orderStatus={orderStatus}
        orderDetailsData={data?.orderDetailsData}
        getOrderDetails={(showLoading: boolean) => getOrderDetails(showLoading)}
      />

      {RecomList &&
        data?.easterEggInfo.distProducts &&
        data?.easterEggInfo.distProducts.length > 0 && (
          <ProductComponent
            isRecom={true}
            setShowMore={setShowMore}
            showMore={showMore}
            subTitle={data?.easterEggInfo.subTitle}
          >
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
          </ProductComponent>
        )}

      {!data?.shouldDisplayEasterEgg &&
        data?.recProducts &&
        data?.recProducts.length > 0 &&
        !Qualification && (
          <ProductComponent isRecom={false}>
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
          </ProductComponent>
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
            <HomeButton onClick={() => nativeUtils.changeAccount(data.orderNo)}>
              {data?.loanFailed.changeCard.buttonText}
            </HomeButton>
          )}
        </BottomButtonContent>
      )}

      {(Qualification || (!data?.isReCard && data?.buttonsData)) && (
        <BottomButtonContent>
          {Qualification && (
            <HomeButton onClick={() => nativeUtils.jumpToHome()}>Back To Home</HomeButton>
          )}
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
