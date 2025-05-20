import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { ComplaintList } from "@/pages/ComplaintList";
import { IntelligentCustomerService } from "@/pages/IntelligentCustomerService";
import { AccessFails } from "@/pages/accessFails";
import { ComplaintDetails } from "@/pages/complaint/ComplaintDetails";
import { ComplaintForm } from "@/pages/complaint/ComplaintForm";
import { ComplaintOrders } from "@/pages/complaint/ComplaintOrders";
import { CustomerService } from "@/pages/customerService";
// import { ConfirmLoanPage } from "@/pages/confirmLoan";
import { ExtendedRepayment } from "@/pages/extendedRepayment";
import { OrderDetails } from "@/pages/orderDetails";
import { PrivacyAgreement } from "@/pages/privacyAgreement";
import { RecommendedList } from "@/pages/recommendList";
import { RepaymentCodePage } from "@/pages/repaymentCode";
import { RepaymentMethod } from "@/pages/repaymentMethod";
import { SinglePeriodRepayment } from "@/pages/singlePeriodRepayment";

import { RouterConfig } from "@/router/routerConfig";

const AppContainer = styled.div`
  width: 100%;
`;

const App: FC = () => {
  return (
    <HashRouter>
      <AppContainer>
        <Routes>
          {/* <Route path={RouterConfig.CONFIRM_OF_LOAN} element={<ConfirmLoanPage />} /> */}
          {/* 订单详情页 */}
          <Route path={RouterConfig.ORDER_DETAILS} element={<OrderDetails />} />
          {/* 联登失败页 */}
          <Route path={RouterConfig.JOINT_LOGON_FAIL} element={<AccessFails />} />
          {/* 单期还款页 */}
          <Route path={RouterConfig.REPAYMENT_OF_PERIOD} element={<SinglePeriodRepayment />} />
          {/* 展期还款页 */}
          <Route path={RouterConfig.REPAYMENT_OF_DELAY} element={<ExtendedRepayment />} />
          {/* 还款方式页 */}
          <Route path={RouterConfig.REPAYMENT_METHODS} element={<RepaymentMethod />} />
          {/* 还款码页 */}
          <Route path={RouterConfig.REPAYMENT_CODE} element={<RepaymentCodePage />} />

          {/* 隐私协议 */}
          <Route path={RouterConfig.PRIVACY_POLICY} element={<PrivacyAgreement />} />
          {/* 借款协议 */}
          <Route path={RouterConfig.AGREEMENT_PAGE} element={<PrivacyAgreement type={true} />} />

          <Route path={RouterConfig.RECOMMENDED_LIST} element={<RecommendedList />} />

          <Route path={RouterConfig.SERVICE_CENTER} element={<CustomerService />} />
          <Route path={RouterConfig.COMPLAINT_LIST} element={<ComplaintList />} />
          <Route path={RouterConfig.COMPLAINT_DETAILS} element={<ComplaintDetails />} />
          <Route path={RouterConfig.COMPLAINT_ORDERS} element={<ComplaintOrders />} />
          <Route path={RouterConfig.SMART_SERVICE} element={<IntelligentCustomerService />} />
          <Route path={RouterConfig.COMPLAINT_FORM} element={<ComplaintForm />} />
        </Routes>
      </AppContainer>
    </HashRouter>
  );
};

export default App;
