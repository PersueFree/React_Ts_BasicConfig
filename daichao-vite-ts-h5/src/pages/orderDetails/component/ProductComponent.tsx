import { FC } from "react";
import styled from "styled-components";

const OrderNum = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: normal;
  font-size: 0.7rem;
  color: #333333;
  line-height: 0.85rem;
  text-align: right;
  font-style: oblique;
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

interface ProductComponentTypes {
  children: React.ReactNode;
  isRecom: boolean;
  setShowMore?: React.Dispatch<React.SetStateAction<boolean>>;
  showMore?: boolean;
  subTitle?: string;
}

const ProductComponent: FC<ProductComponentTypes> = ({
  children,
  isRecom,
  setShowMore,
  showMore,
  subTitle,
}) => {
  return (
    <AccessProductContent>
      <AccessTitleContent>
        <AccessTitle>{isRecom ? subTitle : "Recommendation"}</AccessTitle>
        <AccessIcon />
      </AccessTitleContent>
      <ProductList>{children}</ProductList>
      {isRecom && (
        <ListMore onClick={() => setShowMore && setShowMore(!showMore)}>
          {showMore ? "Close" : "More"}
        </ListMore>
      )}
    </AccessProductContent>
  );
};

export { ProductComponent };
