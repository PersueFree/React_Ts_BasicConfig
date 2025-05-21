import qs from "query-string";
import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getQueryParams } from "@/utils/getQueryParams";

import { repaymentMethodImages } from "@/assets/images";

import { fetchRepaymentMethods } from "@/api";
import { Toast } from "@/components";
import { Container } from "@/components";
// import mock_repaymentMethods from "@/mock/mock_repaymentMethod.json";
import { RepaymentMethodsData } from "@/modules/RepaymentMethodData";
import type { PaymentMethodItemTypes } from "@/modules/RepaymentMethodData";
import { RouterConfig } from "@/router/routerConfig";
import theme from "@/styles/theme";
import { numFormat, setPageTitle } from "@/utils";

const TopAmountContent = styled.div`
  width: calc(100% - 0.45rem);
  height: 7.5rem;
  background-image: url(${repaymentMethodImages.METHOD_AMOUNT});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  padding: 1.05rem 6.45rem 2.5rem 0.7rem;
`;
const AmountTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.7rem;
  color: #b0b3e0;
  line-height: 0.85rem;
  text-align: left;
  font-style: normal;
`;
const AmountValue = styled.div`
  font-family: DINAlternate, DINAlternate;
  font-weight: bold;
  font-size: 2rem;
  color: #ffffff;
  line-height: 2.35rem;
  text-align: left;
  font-style: normal;
`;

const MethodsContent = styled.div`
  height: 100%;
  background: linear-gradient(112deg, #f1f2ff 0%, #ffffff 100%);
  border-radius: 1rem 1rem 0px 0px;
  margin-top: -2.35rem;

  padding-bottom: 6rem;
`;
const MethodsTabs = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 0 0.5rem;

  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;
const TabItem = styled.div<{ $selected?: boolean }>`
  font-family: Helvetica;
  font-weight: ${(props) => (props.$selected ? "bold" : "normal")};
  font-size: 0.7rem;
  color: ${(props) => (props.$selected ? "#FFA502" : "#B79AFF")};
  line-height: 0.9rem;
  text-align: center;
  font-style: normal;
  padding: 0.65rem 0 0.35rem 0;

  position: relative;
  ${(props) =>
    props.$selected &&
    `&::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1rem;
    height: 0.2rem;
    background: linear-gradient(135deg, #3d3bb4 0%, #a672e6 100%), #ffffff;
    border-radius: 1rem;
  }`}
`;
const MethodsList = styled.div`
  padding: 0.5rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MethodItem = styled.div<{ $isOptional?: boolean }>`
  height: 2.5rem;
  padding: 0.25rem 0.7rem 0.25rem 0.5rem;
  background: ${(props) => (props.$isOptional ? "#EBEBF8" : "#ffffff")};
  border-radius: 0.5rem;
  border: 1px solid #ebebf8;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MethodItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.75rem;
`;
const MethodIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  border-radius: 0.25rem;
`;
const MethodInfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const MethodName = styled.div`
  font-family: Helvetica;
  font-size: 0.7rem;
  color: #2a2a29;
  line-height: 1rem;
  text-align: left;
  font-style: normal;
`;
const MethodTips = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #ffa502;
  line-height: 0.5rem;
  text-align: left;
  font-style: normal;
`;
const MethodChecked = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
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
const HomeButton = styled.div`
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

const RepaymentMethod: FC = () => {
  const [methodsList, setMethodsList] = useState<RepaymentMethodsData | null>();
  const [amount, setAmount] = useState<number | string | undefined>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [selectMethods, setSelectMethods] = useState<PaymentMethodItemTypes | null>();
  const [methodIndex, setMethodsIndex] = useState<number | null>();
  useEffect(() => {
    setPageTitle("Loan Payment");
    getMethods();
  }, []);

  // 滚动到当前激活的标签
  useEffect(() => {
    if (!tabContainerRef.current) return;

    // 检查activeTab是否有效
    if (activeTab < 0 || activeTab >= tabContainerRef.current.children.length) {
      return;
    }

    const activeTabElement = tabContainerRef.current.children[activeTab];
    const containerRect = tabContainerRef.current.getBoundingClientRect();
    const activeTabRect = activeTabElement.getBoundingClientRect();

    const scrollLeft =
      activeTabRect.left -
      containerRect.left +
      tabContainerRef.current.scrollLeft -
      containerRect.width / 2 +
      activeTabRect.width / 2;

    // 使用平滑滚动
    requestAnimationFrame(() => {
      if (tabContainerRef.current) {
        tabContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    });
  }, [activeTab]);

  const getMethods = async () => {
    Toast.showLoading("loading...");
    const params = getQueryParams();
    try {
      const res = await fetchRepaymentMethods();
      const _data = RepaymentMethodsData.parseData(res.data);
      Toast.clear();
      setAmount(numFormat(params.amount));
      setMethodsList(_data);
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

  // 选择支付方式
  const handleSelectMethod = (item: PaymentMethodItemTypes, index: number) => {
    if (item.status == 1) {
      setMethodsIndex(index);
      setSelectMethods(item);
    }
  };

  // 去还款码页
  const handleSubmitButtonClick = () => {
    const repaymentItem = selectMethods;

    if (repaymentItem == null) {
      Toast.show("Please choose repayType");
      return;
    }
    localStorage.setItem("typecode", JSON.stringify(repaymentItem.type));
    localStorage.setItem("payName", repaymentItem.name || "");

    const paramString = qs.stringify({
      ...getQueryParams(),
      chooseName: repaymentItem.name,
    });

    window.location.href = `#${RouterConfig.REPAYMENT_CODE}?${paramString}`;
  };

  return (
    <Container $background={theme.colors.methodBg} $paddingBottom='0'>
      <TopAmountContent>
        <AmountTitle>Your Credit Amount</AmountTitle>
        <AmountValue>{amount}</AmountValue>
      </TopAmountContent>

      <MethodsContent>
        <MethodsTabs ref={tabContainerRef}>
          {methodsList?.tabsData?.map((item, index) => (
            <TabItem
              $selected={activeTab == index}
              onClick={() => {
                setActiveTab(index);
                setMethodsIndex(null);
                setSelectMethods(null);
              }}
              key={`${item.name}-${index}`}
            >
              {item.name}
            </TabItem>
          ))}
        </MethodsTabs>
        <MethodsList>
          {methodsList?.tabsData?.[activeTab]?.list?.map((item, index) => (
            <MethodItem
              $isOptional={item.status != 1}
              key={`${item.name}-${index}`}
              onClick={() => handleSelectMethod(item, index)}
            >
              <MethodItemContent>
                <MethodIcon src={item.logo} />
                <MethodInfoContent>
                  <MethodName>{item.name}</MethodName>
                  {item.status != 1 && (
                    <MethodTips>
                      The bank is under maintenance. Please use another method or try again later.
                    </MethodTips>
                  )}
                </MethodInfoContent>
              </MethodItemContent>
              {item.status == 1 && (
                <MethodChecked
                  src={
                    methodIndex == index
                      ? repaymentMethodImages.METHOD_SELECTED
                      : repaymentMethodImages.METHOD_SELECT
                  }
                />
              )}
            </MethodItem>
          ))}
        </MethodsList>
      </MethodsContent>

      <BottomButtonContent>
        <HomeButton onClick={() => handleSubmitButtonClick()}>To Repay</HomeButton>
      </BottomButtonContent>
    </Container>
  );
};

export { RepaymentMethod };
