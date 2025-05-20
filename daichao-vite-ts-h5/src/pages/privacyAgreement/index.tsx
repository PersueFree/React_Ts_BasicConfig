import { FC, useEffect } from "react";
import styled from "styled-components";

import { setPageTitle } from "@/utils";

import { LoanAgreement } from "./component/LoanAgreement";
import { PrivacyComponent } from "./component/PrivacyComponent";

const Container = styled.div`
  padding: 0.6rem;
  font-size: 0.6rem;
  line-height: 1.5rem;
  background: #fff;

  h1 {
    font-size: 0.85rem;
    text-align: center;
    font-weight: bold;
    text-indent: 0;
  }
  h2 {
    font-weight: bold;
    font-size: 0.8rem;
    text-indent: 0;
    margin-top: 0.5rem;
  }
  p {
    text-indent: 1.5rem;
  }
  p span {
    font-weight: bold;
  }
  p b {
    text-decoration: underline;
  }
  .bold {
    font-weight: bold;
  }
  .subtitle {
    font-weight: bold;
    font-size: 0.8rem;
    text-indent: 0;
    margin-top: 0.5rem;
  }
  .subSec {
    font-weight: bold;
    font-size: 0.7rem;
    text-indent: 0;
    margin-top: 0.5rem;
  }
  .subThr {
    font-weight: bold;
    font-size: 0.6rem;
    text-indent: 0;
    margin-top: 0.5rem;
  }
  .subList li {
    position: relative;
    padding-left: 1.5rem;
  }
  .subList li::before {
    content: "•";
    position: absolute;
    left: 0.5rem;
    top: 0;
    color: rgb(31, 57, 236);
    font-size: 1.5em;
  }
  .subNum {
    color: rgb(31, 57, 236);
  }
  .table-container {
    display: flex;
    flex-direction: column;
    margin: 20px;
    border: 2px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }

  .table-row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  .table-row.header {
    font-weight: bold;
  }

  .table-cell {
    flex: 1;
    text-align: center;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .table-cell:not(:last-child) {
    border-right: 1px solid #ccc;
  }

  .grid-container2 {
    display: flex;
    flex-wrap: wrap;
    margin: 20px;
    border: 2px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }

  .grid-item {
    flex: 0 0 50%;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    text-align: left;
  }

  .grid-item:not(:nth-child(2n)) {
    border-right: 1px solid #ccc;
  }
`;

const PrivacyAgreement: FC<{ type?: boolean }> = ({ type }) => {
  useEffect(() => {
    if (type) {
      setPageTitle("Loan Agreement");
    } else {
      setPageTitle("Privacy Agreement");
    }
    window.scrollTo(0, 0);
  }, []);

  return <Container>{type ? <LoanAgreement /> : <PrivacyComponent />}</Container>;
};
export { PrivacyAgreement };
