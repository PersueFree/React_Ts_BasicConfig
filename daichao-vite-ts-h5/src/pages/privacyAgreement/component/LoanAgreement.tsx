import { useEffect, useState } from "react";

import { AppConfig } from "@/AppConfig";
import { fetchBorrowMoney } from "@/api";
import { Toast } from "@/components";
import { LoanAgreementData } from "@/modules/LoanAgreementData";

const LoanAgreement = () => {
  const [data, setData] = useState<LoanAgreementData | null>();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    Toast.showLoading("loading...");
    try {
      const res = await fetchBorrowMoney();
      Toast.clear();
      const data = LoanAgreementData.fromJson(res.data);
      setData(data);
    } catch (err) {
      console.error(err);
      Toast.clear();
    }
  };

  return (
    <>
      <>
        <p style={{ fontSize: ".8rem", fontWeight: "bold", textAlign: "center" }}>Loan Agreement</p>
        <p>This Loan Agreement (“Agreement”) is entered into between:</p>
        <p>Lender: {data?.companyName} </p>
        <p>Borrower: {data?.name}</p>
        <p>Collectively referred to as the “Parties”</p>

        <p>
          In view of the Borrower's need for funds, the Lender agrees to provide a loan to the
          Borrower through {AppConfig.appName}. In order to clarify the rights and obligations of
          both parties, in accordance with the relevant laws and regulations of the Philippines
          (such as the Civil Code of the Philippines), the two parties have reached the following
          agreement through consultation.
        </p>

        <p className='subtitle'>Loan Terms</p>
        <p>
          <span>Loan Amount: </span>The Lender lends the Borrower Philippine Pesos {data?.principal}
          .
        </p>
        <p>
          <span>Purpose of Loan: </span>The purpose of the loan is unlimited, but it cannot be used
          for illegal activities. If the Borrower uses the loan for illegal purposes, the Lender has
          the right to immediately recover the entire loan and pursue the Borrower for breach of
          contract.{" "}
        </p>
        <p>
          <span>Loan Term: </span>From the date of loan issuance to the date of loan maturity and
          settlement, a total of {data?.term} days.
        </p>
        <p>
          <span>Loan Interest Rate: </span>This loan adopts a fixed interest rate, calculated at a
          monthly interest rate {data?.monthInterestRate}, and interest is calculated on a daily
          basis from the actual date of loan issuance.
        </p>
        {data?.shelfProduct == 1 && <p>The annual interest rate is 18%.</p>}

        <p className='subtitle'>Disbursement</p>
        <p>
          After the loan is approved, the funds will be transferred to the Borrower's designated
          bank account (or e-wallet) on the same day after deducting relevant fees.
        </p>
        <p>
          The loan will be deemed to be successfully issued from the date the loan funds arrive at
          the Borrower's designated account, and the loan period will be calculated from that date.
        </p>

        <p className='subtitle'>Repayment</p>
        <p>
          The Borrower shall repay the loan in full before each repayment date specified in the
          Repayment Schedule:
        </p>

        <div className='table-container'>
          {/* 表头 */}
          <div className='table-row header'>
            <div className='table-cell'>Term</div>
            <div className='table-cell'>Repayment Amount</div>
            <div className='table-cell'>Payment date</div>
          </div>

          {/* 遍历数据 */}
          {data?.repayPlans?.map((item, index) => (
            <div className='table-row' key={index}>
              <div className='table-cell'>{`${item?.periodNo}/${data.periods}`} Period</div>
              <div className='table-cell'>{item?.repayMoney}</div>
              <div className='table-cell'>{item?.repayDay}</div>
            </div>
          ))}
        </div>

        <div className='grid-container2'>
          <div className='grid-item'>Loan Amount</div>
          <div className='grid-item'>{data?.principal}</div>
          <div className='grid-item'>Loan Terms</div>
          <div className='grid-item'>{data?.term}</div>
          <div className='grid-item'>Interest Rate</div>
          <div className='grid-item'>{data?.dailyInterestRate}</div>
          <div className='grid-item'>Service Amount</div>
          <div className='grid-item'>{data?.serviceFee}</div>
          <div className='grid-item'>Account Owner Name</div>
          <div className='grid-item'>{data?.name}</div>
        </div>

        <p>Borrowers can repay in advance at any time without paying penalty.</p>
        <p>
          When repaying, transfer the entire repayment amount to the repayment account designated by
          Dami Credit, or repay on time through other legal repayment channels provided by Dami
          Credit.
        </p>

        <p className='subtitle'>Declarations and Warranties</p>
        <ul className='subList'>
          <li>
            The Borrower has reached the legal age, has full civil capacity, and has the right to
            sign and perform this Agreement.
          </li>
          <li>
            The Borrower will strictly cooperate with the Lender and the APP to complete the
            necessary data verification in accordance with the requirements of the Philippine Data
            Privacy Act;
          </li>
          <li>
            All information, documents and statements provided by the Borrower to the Lender are
            true, complete and accurate without any false records, misleading statements or major
            omissions.
          </li>
          <li>
            The Borrower guarantees that the loan will not be used for any illegal or irregular
            activities.
          </li>
          <li>
            The Borrower has no undisclosed debts or legal disputes, which may have an adverse
            impact on the Borrower's ability to perform this Agreement.
          </li>
        </ul>

        <p className='subtitle'>Late Payment and Default</p>
        <p>
          If the Borrower fails to repay the principal and interest of the loan within the repayment
          period agreed in this Agreement, it shall be deemed that the Borrower has defaulted. For
          each day of overdue payment, the Borrower shall pay a penalty at the default interest rate
          of {data?.dayOverdueRate} increased daily until the Borrower settles the loan.
        </p>
        <p>
          If the Borrower uses the loan for a purpose other than that agreed in this Agreement, the
          Lender has the right to require the Borrower to repay the principal and interest of the
          loan immediately.
        </p>
        <p>
          If the information provided by the Borrower is untrue, inaccurate, incomplete, or there
          are other acts that violate the provisions of this Agreement, causing losses to the
          Lender, the Borrower shall bear the corresponding compensation liability.
        </p>

        <p className='subtitle'>Privacy and Data Use</p>
        <p>
          The Borrower agrees with the Lender's user privacy policy and authorizes it to collect,
          process and use his or her personal information for credit assessment, loan processing,
          repayment management and legal collection purposes.
        </p>

        <p className='subtitle'>Governing Law and Dispute Resolution</p>
        <p>This Agreement shall be governed by the laws of the Republic of the Philippines.</p>
        <p>
          The Parties agreed to resolve the dispute through negotiation first. If no agreement can
          be reached, the dispute will be submitted to a local arbitration institution, which will
          make a legally binding decision in accordance with its arbitration rules.
        </p>

        <p className='subtitle'>Electronic Signature</p>
        <p>
          The Borrower must read this Agreement carefully before submitting a loan application.
          Submitting a loan application is deemed to be an electronic signature of this Agreement,
          which has the same legal effect as a handwritten signature.
        </p>

        <p className='subtitle'>Miscellaneous</p>

        <p>This Agreement is the full Agreement between the Parties.</p>
        <p>If any provision is found invalid, the rest shall remain valid.</p>
        <p>
          This Agreement shall come into effect on the date when both parties sign (or seal) this
          Agreement.
        </p>

        <p>Lender: {data?.companyName}</p>
        <p>Borrower: {data?.name}</p>
        <p>Signing Date: {data?.loanTime}</p>
      </>
    </>
  );
};
export { LoanAgreement };
