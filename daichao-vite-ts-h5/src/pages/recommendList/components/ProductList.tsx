import { FC } from "react";
import styled from "styled-components";

import { ProductAccessJump } from "@/utils/ProductAccessJump";
import { RecommendationListData } from "@/modules/RecommendationListData"; 

import { ProductItem } from "@/components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface Props {
  data: RecommendationListData["recProducts"];
}

const ProductList: FC<Props> = ({ data }) => {
  return (
    <Container className='products'>
      {data.map((item, index) => {
        return (
          <ProductItem
            index={index}
            key={`${item.productName}-${index}`}
            productLogo={item.productLogo}
            productName={item.productName}
            buttonStatus={1}
            amount={item.amount}
            loanTerms={item.loanTerms}
            interestRate={item.interestRate}
            buttonText={"Apply Now"}
            onClick={() => ProductAccessJump(item.productId, 5)}
          />
        );
      })}
    </Container>
  );
};
export { ProductList };
