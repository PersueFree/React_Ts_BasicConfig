import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { repaymentCodeImages } from "@/assets/images";

import { fetchRepaymentCode } from "@/api";
import { Container, Toast } from "@/components";
// import mock_repaymentCode from "@/mock/mock_repaymentCode.json";
import { RepaymentCodeData } from "@/modules/RepaymentCodeData";
import { setPageTitle } from "@/utils";

import { CountDownComponent, QrcodeConponent, RepaymentBarCode } from "./component";

const RepaymentContent = styled.div`
  width: 100%;
  background: #ededf5;
  border-radius: 0.5rem;
`;
const RepaymentCardContent = styled.div<{ $details?: boolean }>`
  padding: ${(props) => (props.$details ? "1.25rem 1rem 1rem" : "0.5rem 0.5rem 1rem")};
  position: relative;
  border-bottom: 0.05rem dashed #ffffff;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${(props) =>
    props.$details &&
    `
  justify-content: space-between;
  align-items: center;
`}

  &::before,
  &::after {
    content: "";
    width: 1rem;
    height: 1rem;
    background: #ffffff;
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
const RepayInfoContent = styled.div`
  background: linear-gradient(135deg, #3d3bb4 0%, #a672e6 100%), #ffffff;
  border-radius: 0.5rem;
  padding: 0.4rem 0.5rem 0.4rem 0.75rem;

  display: flex;
  flex-direction: column;
  gap: 1.9rem;
`;
const RepayDateTip = styled.div`
  position: relative;
  padding: 0.3rem 0.2rem 0 0.9rem;
`;
const RepayTipIcon = styled.img`
  width: 2.35rem;
  height: 2.35rem;
  flex-shrink: 0;

  position: absolute;
  left: 0;
  top: -0.3rem;
`;
const RepayTipContent = styled.div`
  min-height: 2.2rem;
  background: #ffffff;
  border-radius: 0px 1.1rem 1.1rem 0px;
  border: 1px solid #ffb450;

  padding: 0.4rem 0.6rem 0.4rem 1.95rem;
`;
const RepayTip = styled.div`
  min-height: 1.3rem;
  border-left: 0.2rem solid #ffb450;
  padding-left: 0.5rem;
  font-family: Helvetica;
  font-size: 0.6rem;
  color: #ff8a00;
  line-height: 0.7rem;
  text-align: left;
  font-style: normal;
  text-transform: none;
`;
const RepayMethodInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RepayMethodInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const RepayMethodLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  border-radius: 0.25rem;
`;
const RepayMethodName = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: #ffffff;
  line-height: 1rem;
  text-align: left;
  font-style: normal;
`;
const RepayMethodButton = styled.div`
  width: 4.9rem;
  height: 1.05rem;
  background: linear-gradient(270deg, #ff9737 0%, #ffed68 100%);
  border-radius: 0.55rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Helvetica;
  font-size: 0.6rem;
  color: #ffffff;
  line-height: 0.9rem;
  text-align: center;
  font-style: normal;
`;
const RepayAccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const RepayAccountTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #ffffff;
  line-height: 0.6rem;
  text-align: left;
  font-style: normal;
`;
const RepayAccountNumber = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1.2rem;
  color: #ffffff;
  line-height: 1.45rem;
  text-align: left;
  font-style: normal;
`;
const RepayDetailsItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #ffffff;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;
const ItemTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #999999;
  line-height: 0.6rem;
  text-align: left;
  font-style: normal;
`;
const ItemValue = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: #333333;
  line-height: 0.85rem;
  text-align: left;
  font-style: normal;
`;

const RepaymentAssistance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const RepayAssisIcon = styled.img`
  width: 8rem;
  height: 1.55rem;
  flex-shrink: 0;
`;
const RepayAssisImage = styled.img`
  border-radius: 1rem;
  background: linear-gradient(to bottom, #3e3bb4 0%, #a572e6 100%);
  padding: 0.5rem;

  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

const RepaymentCodePage: FC = () => {
  const [repayData, setRepayData] = useState<RepaymentCodeData | null>(null);
  const [showAssis, setShowAssis] = useState<boolean>(true);
  useEffect(() => {
    setPageTitle(localStorage.getItem("payName") ?? "");
    fetchData();
  }, []);

  const fetchData = async () => {
    Toast.showLoading("loading...");
    try {
      const res = await fetchRepaymentCode();
      const _data = RepaymentCodeData.parseJson(res.data);
      Toast.clear();
      setRepayData(_data);
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

  const handleClickCopy = async (str?: string) => {
    if (!str) return;
    const copy = (await import("copy-to-clipboard")).default;
    try {
      await copy(str);
      Toast.show("success");
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

  return (
    <Container>
      <RepaymentContent>
        <RepaymentCardContent>
          {repayData?.repayType != 4 ? (
            <>
              <RepayInfoContent>
                <RepayMethodInfo>
                  <RepayMethodInfoBox>
                    <RepayMethodLogo src={repayData?.repaymentCommonData?.repayLogo} />
                    <RepayMethodName>{repayData?.repaymentCommonData?.repayName}</RepayMethodName>
                  </RepayMethodInfoBox>
                  <RepayMethodButton
                    onClick={() => handleClickCopy(repayData?.repaymentCommonData?.repaymentCode)}
                  >
                    Click to Copy
                  </RepayMethodButton>
                </RepayMethodInfo>
                <RepayAccountInfo>
                  <RepayAccountTitle>Receipt Account</RepayAccountTitle>
                  <RepayAccountNumber>
                    {repayData?.repaymentCommonData?.repaymentCode}
                  </RepayAccountNumber>
                </RepayAccountInfo>
              </RepayInfoContent>
              {(repayData?.repayType == 5 ||
                repayData?.repaymentCountdownData?.expiredTimeText) && (
                <RepayDateTip>
                  <RepayTipIcon src={repaymentCodeImages.TIP_BELL} />
                  <RepayTipContent>
                    <RepayTip
                      dangerouslySetInnerHTML={{
                        __html:
                          repayData?.repayType == 5
                            ? repayData?.repaymentCommonData?.repaymentNote
                            : repayData?.repaymentCountdownData?.expiredTimeText,
                      }}
                    />
                  </RepayTipContent>
                </RepayDateTip>
              )}
              {repayData?.repayType !== 5 && (
                <CountDownComponent
                  endTime={repayData?.repaymentCountdownData?.expiredTime}
                  note={repayData?.repaymentCommonData?.repaymentNote}
                />
              )}
            </>
          ) : (
            <>
              {repayData?.repaymentCountdownData?.expiredTimeText && (
                <RepayDateTip>
                  <RepayTipIcon src={repaymentCodeImages.TIP_BELL} />
                  <RepayTipContent>
                    <RepayTip
                      dangerouslySetInnerHTML={{
                        __html: repayData?.repaymentCountdownData?.expiredTimeText,
                      }}
                    />
                  </RepayTipContent>
                </RepayDateTip>
              )}
              <CountDownComponent
                endTime={repayData?.repaymentCountdownData?.expiredTime}
                note={repayData?.repaymentQrcodeData?.repaymentNote}
              />
            </>
          )}
        </RepaymentCardContent>
        <RepaymentCardContent $details>
          {repayData?.repayType != 4 ? (
            repayData?.repaymentDetailsData?.map((item, index) => (
              <RepayDetailsItem key={`${item.text}-${index}`}>
                <ItemTitle>{item?.text}</ItemTitle>
                <ItemValue>{item?.value}</ItemValue>
              </RepayDetailsItem>
            ))
          ) : (
            <QrcodeConponent
              codeUrl={repayData?.repaymentQrcodeData?.repaymentCodeUrl}
              codeData={repayData?.repaymentQrcodeData?.repaymentCode}
            />
          )}
        </RepaymentCardContent>
      </RepaymentContent>

      {repayData?.repayType == 3 && <RepaymentBarCode value={repayData.barcode} />}

      <RepaymentAssistance>
        <RepayAssisIcon
          onClick={() => setShowAssis(!showAssis)}
          src={repaymentCodeImages.ASSISTANCE}
        />
        {showAssis && <RepayAssisImage src={repayData?.repayGuidImg} />}
      </RepaymentAssistance>
    </Container>
  );
};

export { RepaymentCodePage };
