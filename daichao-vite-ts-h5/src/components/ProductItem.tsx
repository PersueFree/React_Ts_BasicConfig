import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 6.6rem;
  background-color: #fff;
  border-radius: 0.5rem;
  border: 1px solid #edf0f7;

  padding: 0.5rem 0.5rem 0.15rem;
`;

const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #edeefd;
  border-radius: 0.4rem;
  padding: 0.5rem 0.6rem;
  gap: 0.5rem;
`;
const ProductBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ProductLogo = styled.img`
  width: 1.9rem;
  height: 1.9rem;
  border: 1px solid #c1c5ff;
  border-radius: 0.25rem;
  flex-shrink: 0;
`;
const ProductName = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.8rem;
  color: #333333;
  line-height: 0.95rem;
  text-align: justify;
  font-style: normal;
`;
const ApplyButton = styled.div<{ $buttonStatus?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4.6rem;
  height: 1.5rem;
  background: ${(props) =>
    props.$buttonStatus
      ? "linear-gradient( 135deg, #3D3BB4 0%, #A672E6 100%), #B7B1D1"
      : "#b7b1d1"};
  border-radius: 0.75rem;
  padding: 0.15rem 0.4rem;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.6rem;
  color: #ffffff;
  line-height: 0.7rem;
  text-align: center;
  font-style: normal;
`;

const BtmContent = styled.div`
  margin-top: 0.35rem;

  font-family: Helvetica;
  font-size: 0.6rem;
  line-height: 0.7rem;

  display: flex;
  justify-content: space-between;
`;
const Available = styled.div``;
const AvailableTitle = styled.div`
  color: #c0bbe5;
  text-align: left;
  font-style: normal;
`;
const AvailableAmount = styled.div`
  font-family: DINAlternate, DINAlternate;
  font-weight: bold;
  font-size: 1.6rem;
  color: #6a52c9;
  line-height: 2rem;
  text-align: justify;
  font-style: normal;
`;
const LoanRate = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.45rem;
`;

const RateValue = styled.div`
  background: #fff4de;
  border-radius: 0.15rem;
  padding: 0.2rem 0.25rem 0.15rem;

  font-weight: normal;
  color: #a79268;
  text-align: right;
  font-style: oblique;

  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Circle = styled.div`
  width: 0.15rem;
  height: 0.15rem;
  flex-shrink: 0;
  background: #A79268;
  border-radius: 0.15rem;
`;

interface ProductItemProps {
  index: number;
  productName?: string;
  productLogo?: string;
  buttonStatus?: number;
  amount?: string | number;
  loanTerms?: string;
  interestRate?: string;
  buttonText?: string;
  onClick?: () => void;
}

const ProductItem: FC<ProductItemProps> = ({
  index,
  productLogo,
  productName,
  buttonStatus,
  amount,
  loanTerms,
  interestRate,
  buttonText,
  onClick
}) => {
  return (
    <Container key={index} onClick={onClick}>
      <TopContent>
        <ProductBox>
          <ProductLogo src={productLogo} />
          <ProductName>{productName}</ProductName>
        </ProductBox>
        <ApplyButton $buttonStatus={buttonStatus == 1}>{buttonText}</ApplyButton>
      </TopContent>
      <BtmContent>
        <Available>
          <AvailableTitle>Available up to</AvailableTitle>
          <AvailableAmount>{amount}</AvailableAmount>
        </Available>
        <LoanRate>
          <RateValue>{loanTerms}<Circle />{interestRate}</RateValue>
        </LoanRate>
      </BtmContent>
    </Container>
  );
};

export { ProductItem };
