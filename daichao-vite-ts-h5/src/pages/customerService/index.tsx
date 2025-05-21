import React, { FC, useEffect } from "react";
import styled from "styled-components";

import { customerImages } from "@/assets/images";

import { AppConfig } from "@/AppConfig";
import { Container } from "@/components";
import { RouterConfig } from "@/router/routerConfig";
import { setPageTitle } from "@/utils";

import { ServiceCard, ServiceItem } from "./components";

const TopLine = styled.div`
  margin-top: -4.2rem;
  width: 100%;
  background: #442d9e;
  height: 0.6rem;
  border-radius: 0.75rem;
  z-index: 10;
`;

const ContentBox = styled.div`
  margin-top: -1.1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  gap: 0.5rem;
`;

const TopImage = styled.img`
  width: 16.65rem;
  height: 10.2rem;
  flex-shrink: 0;
`;

const CustomerService: FC = () => {
  useEffect(() => {
    setPageTitle("Online Services");
  }, []);

  const jumpToComplaintNewPage = () => {
    window.location.href = `#${RouterConfig.COMPLAINT_ORDERS}`;
  };

  const jumpToComplaintListPage = () => {
    window.location.href = `#${RouterConfig.COMPLAINT_LIST}`;
  };

  const goEmail = () => {
    window.location.href = `Mailto:${AppConfig.csEmail}`;
  };

  return (
    <Container
      $paddingBottom='0'
      $background={"linear-gradient( 135deg, #3D3BB4 0%, #A672E6 100%), #FFFFFF"}
      $flex={"align-items: center;"}
    >
      <TopImage src={customerImages.TOP_BG} />
      <TopLine />
      <ContentBox>
        <ServiceCard>
          <ServiceItem
            title='Customer Service'
            detail='Manual response'
            onClick={() => jumpToComplaintNewPage()}
            Icon={customerImages.CUSTOMER}
            IconRight={customerImages.COMMON_GO}
          />
          <ServiceItem
            title='Consultation records'
            detail='Automatic reply'
            onClick={() => jumpToComplaintListPage()}
            Icon={customerImages.SMART}
            IconRight={customerImages.COMMON_GO}
          />
          <ServiceItem
            title='Customer service email'
            detail={AppConfig.csEmail}
            onClick={() => goEmail()}
            Icon={customerImages.EMAIL}
            IconRight={customerImages.COMMON_GO}
          />
        </ServiceCard>
      </ContentBox>
    </Container>
  );
};

export { CustomerService };
