import { FC } from "react";
import styled from "styled-components";

import type { ComplaintItemFunTypes } from "@/modules/ComplaintListData";
import { RouterConfig } from "@/router/routerConfig";

const Container = styled.div`
  background: #fff;
  border: 1px solid #eceff1;
  border-radius: 5px;
  padding: 0 0.5rem;
  font-size: 0.55rem;
  color: #999999;
  position: relative;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid #eceff1;
  white-space: nowrap;
  overflow: hidden;
`;

const MiddleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
`;

const Tips = styled.div`
  line-height: 0.7rem;
  width: 0.7rem;
  text-align: center;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%) translateY(-35%);
  background-color: red;
  color: #fff;
  font-weight: 700;
  border-radius: 50%;
`;

const Content = styled.div`
  font-size: 0.65rem;
  margin: 0.4rem 0;
  line-height: 1rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.span`
  color: #999;
  font-size: 0.65rem;
  text-overflow: ellipsis;
`;

const TimeText = styled.span`
  color: #666666;
  font-size: 0.65rem;
  text-overflow: ellipsis;
`;

const StatusText = styled.span<{ color?: string | null }>`
  color: ${(props) => props.color};
  font-size: 0.65rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ComplaintItem: FC<{ item: ComplaintItemFunTypes }> = ({ item }) => {
  const handleClick = (item: ComplaintItemFunTypes) => {
    console.log("ComplaintItem", item);
    window.location.href = `/#${RouterConfig.COMPLAINT_DETAILS}?problemId=${item.id}`;
  };

  let color = null;
  switch (item.status) {
    case 1:
      color = "#E02020";
      break;
    case 2:
      color = "#0A6AF4";
      break;
    case 3:
      color = "#6DD400";
      break;
    default:
      color = null;
  }

  return (
    <Container className='complaintItem' onClick={() => handleClick(item)}>
      {item.shouldReFeedback == 1 && <Tips>!</Tips>}
      <section>
        <TopContainer>
          <TimeText>{item.time}</TimeText>
          <StatusText color={color}>{item.statusDes}</StatusText>
        </TopContainer>
        <MiddleContainer>
          <Text>Type of Complaint</Text>
          <StatusText>{item.type}</StatusText>
        </MiddleContainer>
        <Content>{item.content}</Content>
      </section>
    </Container>
  );
};

export { ComplaintItem };
