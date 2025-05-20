import { FC, useEffect } from "react";
import styled from "styled-components";

// import { Container } from "@/components";
import mockApi from "@/mock/mock_confirmDetail.json";

// import { fetchOrderDetails } from "@/api";

const Container = styled.div`
  max-width: 750px;
  margin: 0 auto;
  background: linear-gradient(180deg, #b1b4e4 0%, #ffffff 100%);
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  padding: 0.75rem 0.75rem 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100vh;
  background: #ffffff;
  border-radius: 20px 20px 0px 0px;
`;

const ConfirmLoanPage: FC = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const res = mockApi;
      console.log(res, "res");
      // const res = await fetchOrderDetails();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <Container>
      <Content></Content>
    </Container>
  );
};

export { ConfirmLoanPage };
