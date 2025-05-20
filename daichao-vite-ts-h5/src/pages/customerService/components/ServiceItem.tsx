import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background: #edeefd;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.85rem;

  padding: 0.6rem 0.4rem 0.8rem 0.7rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 0.2rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
  color: #2a2a29;
  line-height: 1rem;
  text-align: left;
  font-style: normal;
`;

const Detail = styled.div`
  font-size: 0.6rem;
  color: #b0b0b0;
  line-height: 0.8rem;
  text-align: left;
  font-style: normal;
`;

const DetailIndicator = styled.img`
  width: 1.15rem;
  height: 1.1rem;
  flex-shrink: 0;
`;

interface Props {
  title: string;
  detail: string;
  onClick?: () => void;
  Icon: string;
  IconRight?: string;
}

const ServiceItem: FC<Props> = ({ title, detail, onClick, Icon, IconRight }) => {
  return (
    <Container className='serviceItem' onClick={onClick}>
      <DetailIndicator src={Icon} alt='' />
      <Content>
        <Title>{title}</Title>
        <Detail>{detail}</Detail>
      </Content>
      {IconRight && (
        <img
          src={IconRight}
          style={{ width: "0.8rem", height: "0.8rem", flexShrink: "0" }}
        />
      )}
    </Container>
  );
};
export { ServiceItem };
