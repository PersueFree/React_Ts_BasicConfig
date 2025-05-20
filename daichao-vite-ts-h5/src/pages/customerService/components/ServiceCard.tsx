import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: #fff;

  border-radius: 0.6rem;
  padding: 1rem 0.45rem 0.45rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface Props {
  children: React.ReactNode;
}

const ServiceCard: FC<Props> = ({ children }) => {
  return (
    <Container>
      <ListContainer>{children}</ListContainer>
    </Container>
  );
};
export { ServiceCard };
