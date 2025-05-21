import { FC, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import nativeUtils from "@/utils/nativeUtils";

import { accessFailImage, orderImages } from "@/assets/images";

import { fetchAccessFailsData } from "@/api";
import { Container, Toast } from "@/components";
// import mock_accessfails from "@/mock/mock_accessfails.json";
import { AccessFailsData } from "@/modules/AccessFailsData";
import { setPageTitle } from "@/utils";

import { RecProduct, RepaymentProduct, TopBanner } from "./component";

const TopContent = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.orderABNormalBg};
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

const EmptyContent = styled.div`
  background: linear-gradient(112deg, #f1f2ff 0%, #ffffff 100%);
  border-radius: 1rem;
  border: 1px solid #edf0f7;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;

  padding: 1.1rem 1rem;
`;

const EmptyImg = styled.img`
  width: 7.85rem;
  height: 6.4rem;
  flex-shrink: 0;
`;

const EmptyMsg = styled.div`
  font-family: Helvetica;
  font-size: 0.6rem;
  color: #000000;
  line-height: 0.9rem;
  text-align: center;
  font-style: normal;
`;

const HomeButton = styled.div`
  position: fixed;
  bottom: 1.6rem;
  left: 0;
  right: 0;

  width: calc(100% - 7rem);
  height: 2.5rem;
  margin: 0 auto;
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

const AccessFails: FC = () => {
  const location = useLocation();
  const prevLocationRef = useRef(location);
  const [data, setData] = useState<AccessFailsData | null>();
  const [showDefault, setShowDefault] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === prevLocationRef.current.pathname) {
      if (location.search !== prevLocationRef.current.search) {
        window.location.reload();
      }
    }
    prevLocationRef.current = location;
  }, [location, location.pathname, location.search]);

  useEffect(() => {
    setPageTitle("Loan details");
    getDetailData();
  }, []);

  const getDetailData = async () => {
    Toast.showLoading("loading...");
    try {
      const res = await fetchAccessFailsData();
      Toast.clear();
      const _data = AccessFailsData.parseJson(res.data);
      setData(_data);
      setShowDefault(_data?.recProducts.length == 0 && _data?.repaymentProducts.length == 0);
      console.log(_data);
    } catch (error) {
      if (error instanceof Error) {
        Toast.fail(error.message);
        console.error(error);
      } else if (typeof error === "string") {
        Toast.fail(error);
      } else {
        Toast.fail("发生未知错误");
      }
    }
  };

  return (
    <Container>
      <TopContent>
        <OrderStatusContent>
          <TopBanner title={data?.titleMessage} message={data?.errMessage} />
          <OrderIcon src={orderImages.ORDER_ICON} />
        </OrderStatusContent>
      </TopContent>
      <RepaymentProduct list={data?.repaymentProducts || []} />
      <RecProduct list={data?.recProducts || []} />

      {showDefault && (
        <EmptyContent>
          <EmptyImg src={accessFailImage.EMPTY} />
          <EmptyMsg>{data?.noticeMessage}</EmptyMsg>
          <HomeButton onClick={() => nativeUtils.jumpToHome()}>Back To Home</HomeButton>
        </EmptyContent>
      )}
    </Container>
  );
};
export { AccessFails };
