import { FC } from "react";
import styled from "styled-components";
import nativeUtils from "@/utils/nativeUtils";
import { ProductAccessJump } from "@/utils/ProductAccessJump";

const Container = styled.div`
  background: #fff;
  border-radius: 0.6rem;
  padding: 0 0.6rem;
`;

const ProductLogo = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
`;

const ProductName = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  color: #2a2a29;
  text-align: left;
  font-style: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Button = styled.div`
  width: 11.2rem;
  height: 1.9rem;
  background: linear-gradient(135deg, #3d3bb4 0%, #a672e6 100%), #b7b1d1;
  border-radius: 1.2rem;

  font-weight: bold;
  font-size: 0.7rem;
  color: #fff;
  line-height: 1.9rem;
  text-align: center;
  font-style: normal;

  margin: 0.5rem auto;
`;

const TopContainer = styled.div`
  height: 2.4rem;
  display: flex;
  align-items: center;
`;

const InfoContainer = styled.div`
  background: #edeefd;
  border-radius: 0.5rem;
  padding: 0.8rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoText = styled.span`
  font-size: 0.7rem;
  color: #6b6b6a;
  text-align: left;
  font-style: normal;
`;

const InfoValue = styled.span`
  font-weight: bold;
  font-size: 0.7rem;
  color: #2a2a29;
  text-align: right;
  font-style: normal;
`;

interface Props {
  id: number;
  index: number;
  productLogo: string;
  productName: string;
  amount: string;
  repaymentDate: string;
  url: string;
}

const RepaymentItem: FC<Props> = ({ productLogo, productName, amount, repaymentDate, url, id }) => {
  const handleClick = () => {
    const jumpUrl = url || "";
    if (jumpUrl == "") {
      ProductAccessJump(id, 5);
      return;
    }

    if (jumpUrl.startsWith("http")) {
      window.location.href = url;
    } else {
      nativeUtils.openUrl(jumpUrl);
    }
  };

  return (
    <Container onClick={handleClick}>
      <TopContainer>
        <ProductLogo src={productLogo} />
        <ProductName>{productName}</ProductName>
      </TopContainer>
      <InfoContainer>
        <InfoWrap>
          <InfoText>Amount</InfoText>
          <InfoValue>₱ {amount}</InfoValue>
        </InfoWrap>
        <InfoWrap>
          <InfoText>Date</InfoText>
          <InfoValue>{repaymentDate}</InfoValue>
        </InfoWrap>
      </InfoContainer>
      <Button>Click for quick repayment</Button>
    </Container>
  );
};

export { RepaymentItem };
