import { FC } from "react";
import styled from "styled-components";

import type { RepaymentProductTypes } from "@/modules/AccessFailsData";

import { RepaymentItem } from "./RepaymentItem";

const AccessProductContent = styled.div`
  background: linear-gradient(112deg, #f1f2ff 0%, #ffffff 100%);
  border-radius: 1rem;
  border: 1px solid #ededf5;

  padding: 0.5rem 0.75rem 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`;

interface Props {
  list: RepaymentProductTypes[];
}

const RepaymentProduct: FC<Props> = ({ list }) => {
  if (!list || list.length == 0) return <></>;

  return (
    <AccessProductContent>
      <ProductList>
        {list?.map((item, index) => (
          <RepaymentItem
            index={index}
            key={`${item.productName}-${index}`}
            id={item.id}
            productLogo={item.productLogo}
            productName={item.productName}
            amount={item.amount}
            repaymentDate={item.repaymentDate}
            url={item.url}
          />
        ))}
      </ProductList>
    </AccessProductContent>
  );
};

export { RepaymentProduct };
