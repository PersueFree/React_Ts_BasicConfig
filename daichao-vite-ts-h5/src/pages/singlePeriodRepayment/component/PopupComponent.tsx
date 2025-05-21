import { Popup } from "antd-mobile";
import { FC } from "react";
import styled from "styled-components";

import { singleRepaymentImages } from "@/assets/images";

import type { PopupProps } from "../type";

const ContainerPage = styled(Popup)`
  & > .adm-popup-body {
    padding: 0.8rem 0.5rem 0.5rem;
  }
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

const PopupTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.6rem;
  border-bottom: 1px dashed #d7d7e7;
`;
const PopupTitleText = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.9rem;
  color: #2a2a29;
  line-height: 1.1rem;
  text-align: center;
  font-style: normal;
`;
const PopupCloseIcon = styled.img`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
`;
const PopupContent = styled.div`
  margin-top: 0.6rem;
  background: linear-gradient(139deg, #f1f2ff 0%, #ffffff 100%);
  border-radius: 0.5rem;
  border: 1px solid #f1f2ff;

  padding: 0.5rem;
`;
const PopupAmountContent = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PopupAmount = styled.div<{ $isOverdue?: boolean }>`
  width: 7.1rem;
  height: 4.05rem;
  background-image: url(${(props) =>
    props.$isOverdue
      ? singleRepaymentImages.REPAY_AMOUNT_DUE
      : singleRepaymentImages.REPAY_AMOUNT});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
`;
const PopupAmountTitle = styled.div`
  padding: 0.3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Helvetica;
  font-size: 0.6rem;
  color: #ffffff;
  line-height: 0.7rem;
  text-align: left;
  font-style: normal;
`;
const PopupAmountValue = styled.div`
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1.25rem;
  color: #333333;
  line-height: 1.5rem;
  text-align: left;
  font-style: normal;
`;
const PopupDueDate = styled.div<{ $isOverdue?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  ${OverDue} {
    background: ${(props) => (props.$isOverdue ? "#FFECD7" : "#FFFFFF")};
    color: ${(props) => (props.$isOverdue ? "#ff7a00" : "#999999")};
  }

  ${DueDateContent} {
    align-items: flex-end;
    justify-content: flex-end;
  }
`;
const PopupAccessContent = styled.div`
  margin-top: 0.75rem;
  background: #ffffff;
  border-radius: 0.5rem;
  border: 1px solid #edf0f7;

  padding: 0.5rem 0.75rem 0.55rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;
const PopupAccessTitleContent = styled.div``;
const PopupAccessTitle = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: normal;
  font-size: 0.7rem;
  color: #30294c;
  line-height: 0.85rem;
  text-align: justify;
  font-style: oblique;
`;
const PopupAccessIcon = styled.div`
  margin-top: 0.25rem;
  width: 1.3rem;
  height: 0.25rem;
  background: #6a52c9;
`;
const PopupAmountDetails = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const PopupAmountItem = styled.div`
  flex: 1 1 calc(50% - 10px);
  min-width: calc(50% - 10px);
  background: #fffae4;
  border-radius: 0.3rem;
  padding: 0.25rem 0.5rem;

  font-family: Helvetica;
  text-align: left;
  font-style: normal;
`;
const PopupAmountItemTitle = styled.div`
  margin-bottom: 0.1rem;
  font-size: 0.5rem;
  color: #c9b970;
  line-height: 0.6rem;
`;
const PopupAmountItemValue = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  color: #333333;
  line-height: 0.85rem;
`;

interface PopupComponentTypes {
  popupVisible?: Partial<PopupProps>;
  onClose: () => void;
}

const PopupComponent: FC<PopupComponentTypes> = ({ popupVisible, onClose }) => {
  return (
    <ContainerPage closeOnMaskClick visible={popupVisible?.visible} onClose={onClose}>
      <PopupTitle>
        <PopupTitleText>{popupVisible?.periodNo} Installment</PopupTitleText>
        <PopupCloseIcon onClick={onClose} src={singleRepaymentImages.CLOSE_POPUP} />
      </PopupTitle>
      <PopupContent>
        <PopupAmountContent>
          <PopupAmount $isOverdue={popupVisible?.periodStatus}>
            <PopupAmountTitle>Repayment Amount</PopupAmountTitle>
            <PopupAmountValue>{popupVisible?.displayPaymentAmount}</PopupAmountValue>
          </PopupAmount>
          <PopupDueDate $isOverdue={popupVisible?.periodStatus}>
            <OverDue>{popupVisible?.periodStatus ? "Over Due" : "Outstanding"}</OverDue>
            <DueDateContent>
              <DueDateTitle>Due Date</DueDateTitle>
              <DueDateValue $isOverdue={popupVisible?.periodStatus}>
                {popupVisible?.dueTime}
              </DueDateValue>
            </DueDateContent>
          </PopupDueDate>
        </PopupAmountContent>
        <PopupAccessContent>
          <PopupAccessTitleContent>
            <PopupAccessTitle>Amount Details</PopupAccessTitle>
            <PopupAccessIcon />
          </PopupAccessTitleContent>
          <PopupAmountDetails>
            <PopupAmountItem>
              <PopupAmountItemTitle>Loan principal</PopupAmountItemTitle>
              <PopupAmountItemValue>{popupVisible?.loanPrincipal}</PopupAmountItemValue>
            </PopupAmountItem>
            <PopupAmountItem>
              <PopupAmountItemTitle>Interest amount</PopupAmountItemTitle>
              <PopupAmountItemValue>{popupVisible?.repayInterest}</PopupAmountItemValue>
            </PopupAmountItem>
            <PopupAmountItem>
              <PopupAmountItemTitle>Overdue fee</PopupAmountItemTitle>
              <PopupAmountItemValue>{popupVisible?.overdueFee}</PopupAmountItemValue>
            </PopupAmountItem>
            <PopupAmountItem>
              <PopupAmountItemTitle>Repaid Amount</PopupAmountItemTitle>
              <PopupAmountItemValue>{popupVisible?.repaidAmount}</PopupAmountItemValue>
            </PopupAmountItem>
          </PopupAmountDetails>
        </PopupAccessContent>
      </PopupContent>
    </ContainerPage>
  );
};

export { PopupComponent };
