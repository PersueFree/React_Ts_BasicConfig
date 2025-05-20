import { FC } from "react";
import styled from "styled-components";

import { singleRepaymentImages } from "@/assets/images";

import { SingleRepaymentDate } from "@/modules/SingleRepaymentDate";

const InstallmentList = styled.div`
  width: 100%;
  border-bottom: 1px dashed #edf0f7;
  position: relative;

  padding: 0.75rem 0.5rem;

  &::before,
  &::after {
    content: "";
    width: 1rem;
    height: 1rem;
    background: #f1f2ff;
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
const TopInstallContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;
const InstallmentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: #30294c;
  line-height: 0.85rem;
  text-align: justify;
  font-style: normal;
`;
const Period = styled.div<{ $noClick?: boolean }>`
  width: 1.15rem;
  height: 1.15rem;
  background: ${(props) =>
    props.$noClick ? "#DCDCE7" : "linear-gradient(135deg, #3d3bb4 0%, #a672e6 100%), #ffffff"};
  border-radius: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Barlow, Barlow;
  font-weight: 800;
  font-size: 0.8rem;
  color: ${(props) => (props.$noClick ? "#000000" : "#ffa502")};
  line-height: 0.95rem;
  text-stroke: 1px #ffffff;
  text-align: center;
  font-style: normal;
  -webkit-text-stroke: 1px #ffffff;
`;
const NoClickNote = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #e47070;
  line-height: 0.6rem;
  text-align: right;
  font-style: normal;
`;
const CheckButton = styled.div``;
const CheckIcon = styled.img`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
`;
const BottomInstallContent = styled.div<{ $noClick?: boolean }>`
  margin-top: 0.55rem;
  background: ${(props) => (props.$noClick ? "#DCDCE7" : "#ffffff")};
  border-radius: 0.5rem;
  border: 1px solid #edf0f7;

  padding: 0.5rem 0.3rem 0.5rem 0.5rem;

  display: flex;
  flex-direction: row;
`;
const DueDateContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const DueDateTitle = styled.div`
  font-family: Helvetica;
  font-size: 0.5rem;
  color: #999999;
  line-height: 0.6rem;
  text-align: left;
  font-style: normal;
`;
const DueDateValue = styled.div<{ $isOverdue?: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: ${(props) => (props.$isOverdue ? "#ff7a00" : "#333333")};
  line-height: 0.85rem;
  text-align: left;
  font-style: normal;
`;
const OverDue = styled.div<{ $isOverdue?: boolean; $noClick?: boolean }>`
  background: ${(props) => (props.$isOverdue ? "#FFECD7" : props.$noClick ? "#FFFFFF" : "#F6F6FF")};
  border-radius: 0.55rem;
  padding: 0 0.15rem;

  font-family: Helvetica;
  font-weight: normal;
  font-size: 0.5rem;
  color: ${(props) => (props.$isOverdue ? "#ff7a00" : "#D1D1E4")};
  line-height: 0.7rem;
  text-align: left;
  font-style: normal;
`;
const RepayAmountContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;
const RepayAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;
const AmountTitle = styled(DueDateTitle)``;
const AmountValue = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: #333333;
  line-height: 0.85rem;
  text-align: left;
  font-style: normal;
`;
const ExtendIcon = styled.img`
  width: 0.7rem;
  height: 0.7rem;
  flex-shrink: 0;
`;

interface InstallmentItemProps {
  item: SingleRepaymentDate["repaymentSchedules"][0];
  index: number;
  note?: string;
  isOverdue: boolean;
  NoClick: boolean;
  onPopupClick: () => void;
  onSelectClick: () => void;
}

const InstallmentItem: FC<InstallmentItemProps> = ({
  item,
  index,
  note,
  isOverdue,
  NoClick,
  onPopupClick,
  onSelectClick,
}) => {
  return (
    <InstallmentList key={`${item.repayDes}-${index}`}>
      <TopInstallContent>
        <InstallmentTitle>
          <Period $noClick={NoClick}>{item.periodNo}</Period>
          Installment
        </InstallmentTitle>
        {NoClick ? (
          <NoClickNote>{note}</NoClickNote>
        ) : (
          <CheckButton onClick={onSelectClick}>
            <CheckIcon
              src={item.selected ? singleRepaymentImages.CHECKED : singleRepaymentImages.CHECK}
            />
          </CheckButton>
        )}
      </TopInstallContent>
      <BottomInstallContent $noClick={NoClick}>
        <DueDateContent>
          <DueDateTitle>Due Date</DueDateTitle>
          <DueDateValue $isOverdue={isOverdue}>
            {item.dueTime}
            <OverDue $isOverdue={isOverdue} $noClick={NoClick}>
              {isOverdue ? "Over Due" : "Outstanding"}
            </OverDue>
          </DueDateValue>
        </DueDateContent>
        <RepayAmountContent>
          <RepayAmount>
            <AmountTitle>Repayment Amount</AmountTitle>
            <AmountValue>{item.displayPaymentAmount}</AmountValue>
          </RepayAmount>
          <ExtendIcon
            onClick={onPopupClick}
            src={NoClick ? singleRepaymentImages.ARROW_WHITE : singleRepaymentImages.ARROW}
          />
        </RepayAmountContent>
      </BottomInstallContent>
    </InstallmentList>
  );
};
export { InstallmentItem };
