import { FC } from "react";
import styled from "styled-components";

import { ProductAccessJump } from "@/utils/ProductAccessJump";

import { ProductItem } from "@/components";
import type { RecProduct } from "@/modules/AccessFailsData";

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
const AccessTitle = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: normal;
  font-size: 0.9rem;
  color: #30294c;
  text-align: left;
  line-height: 1.1rem;
  font-style: oblique;
  text-align: justify;
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

interface Props {
  list: RecProduct[];
}

const RecProduct: FC<Props> = ({ list }) => {
  if (!list || list.length == 0) return <></>;

  return (
    <AccessProductContent>
      <AccessTitleContent>
        <AccessTitle>Recommendation</AccessTitle>
        <AccessIcon />
      </AccessTitleContent>
      <ProductList>
        {list?.map((item, index) => (
          <ProductItem
            index={index}
            key={`${item.productName}-${index}`}
            productLogo={item.productLogo}
            productName={item.productName}
            buttonStatus={item.buttonStatus}
            amount={item.amountRange}
            loanTerms={item.termInfo}
            interestRate={item.loanRate}
            buttonText={item.buttonText}
            onClick={() => ProductAccessJump(item.id, 5)}
          />
        ))}
      </ProductList>
    </AccessProductContent>
  );
};

export { RecProduct };
