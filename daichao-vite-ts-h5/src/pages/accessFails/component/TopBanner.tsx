import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding-left: 0.25rem;
  position: relative;

  font-family: Helvetica, Helvetica;
  text-align: left;
  font-style: normal;
  text-transform: none;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #ffffff;
  line-height: 1.75rem;
`;

const SubTitle = styled.div`
  margin-top: 0.2rem;
  font-size: 0.6rem;
  color: #ffffff;
  line-height: 0.8rem;
`;

interface OrderStatusProps {
  title?: string;
  message?: string;
}

const TopBanner: FC<OrderStatusProps> = ({ title, message }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{message}</SubTitle>
    </Container>
  );
};

export { TopBanner };
