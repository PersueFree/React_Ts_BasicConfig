import { FC } from "react";
import styled from "styled-components";

import nativeUtils from "@/utils/nativeUtils";

const Container = styled.div`
  max-width: 750px;
  padding: 3rem 0;
`;

const Button = styled.div`
  width: 65%;
  height: 2.75rem;
  background: #5dcc55;
  border-radius: 0.75rem;

  line-height: 2.75rem;
  font-weight: bold;
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  font-style: normal;
  margin: 0 auto;
`;

const EmptyProducts: FC = () => {
  const handleButtonClick = () => {
    nativeUtils.jumpToHome();
  };

  return (
    <Container>
      <Button onClick={() => handleButtonClick()}>Return to Homepage</Button>
    </Container>
  );
};
export { EmptyProducts };
