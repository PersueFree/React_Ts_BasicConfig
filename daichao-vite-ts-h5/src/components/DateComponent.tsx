import { FC } from "react";
import styled from "styled-components";

const TopContent = styled.div<{ $isOverdue: boolean }>`
  width: 100%;
  background: ${(props) =>
    props.$isOverdue ? props.theme.colors.orderABNormalBg : props.theme.colors.orderNormalBg};
  border-radius: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.55rem;
`;
const Title = styled.div`
  font-family: Helvetica;
  font-size: 0.7rem;
  color: #ffffff;
  line-height: 0.8rem;
  text-align: left;
  font-style: normal;
  text-transform: none;

  padding: 0.75rem 0 0.2rem;
`;

const TipContent = styled.div`
  padding: 0.55rem 2.15rem;
  background: rgba(255, 255, 255, 0.32);

  font-family: Helvetica;
  font-size: 0.6rem;
  color: #333333;
  line-height: 0.8rem;
  text-align: center;
  font-style: normal;
  text-transform: none;
`;

const DateContent = styled.div`
  display: flex;

  gap: 0.5rem;
`;
const DateItemBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 0.5rem;
`;
const DateType = styled.div`
  border-bottom: 0.05rem solid #ffb84a;
  padding: 0.35rem 0;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.5rem;
  color: #d8c9bb;
  line-height: 0.6rem;
  text-align: center;
  font-style: normal;
`;
const DateItem = styled.div`
  padding: 0.6rem 1rem;

  display: flex;
  gap: 0.25rem;
`;
const Item = styled.div<{ $isOverdue?: boolean }>`
  padding: 0.2rem 0.55rem;
  background: ${(props) => (props.$isOverdue ? "#ff7a00" : "#69E1D2")};
  border-radius: 0.25rem;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1.8rem;
  color: ${(props) => (props.$isOverdue ? "#fffed0" : "#115560")};
  line-height: 2.15rem;
  text-align: center;
  font-style: normal;
`;

interface DateContentTypes {
  isOverdue?: number;
  data?: {
    monthTen?: string;
    monthUnits?: string;
    dayTen?: string;
    dayUnits?: string;
    daysDiff?: number;
  };
}

const DateComponent: FC<DateContentTypes> = ({ isOverdue, data }) => {
  return (
    <TopContent $isOverdue={!!isOverdue}>
      <Title>Current due date</Title>
      <DateContent>
        <DateItemBox>
          <DateType>Mouth</DateType>
          <DateItem>
            <Item $isOverdue={!!isOverdue}>{data?.monthTen}</Item>
            <Item $isOverdue={!!isOverdue}>{data?.monthUnits}</Item>
          </DateItem>
        </DateItemBox>
        <DateItemBox>
          <DateType>Day</DateType>
          <DateItem>
            <Item $isOverdue={!!isOverdue}>{data?.dayTen}</Item>
            <Item $isOverdue={!!isOverdue}>{data?.dayUnits}</Item>
          </DateItem>
        </DateItemBox>
      </DateContent>
      <TipContent>
        The nearest due date has &nbsp;
        <span style={{ color: "#FF3D3D", fontWeight: "bold", fontStyle: "italic" }}>
          {isOverdue
            ? `overdue for ${isOverdue} days`
            : `There are still ${data?.daysDiff} days left`}
        </span>
        . Extending will impact your credit.
      </TipContent>
    </TopContent>
  );
};

export { DateComponent };
