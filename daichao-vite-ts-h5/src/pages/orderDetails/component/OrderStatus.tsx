import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { orderImages } from "@/assets/images";

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

const SubTitle = styled.div<{ $status: boolean }>`
  margin-top: 0.2rem;
  font-size: 0.6rem;
  color: ${(props) => (props.$status ? "#bfacff" : "#FFFFFF")};
  line-height: 0.8rem;
`;

const CountDown = styled.div`
  position: absolute;
  top: 0.15rem;
  right: -0.2rem;

  background: linear-gradient(135deg, #ffe6b8 0%, #ffbf65 100%);
  border-radius: 0.65rem;

  font-weight: bold;
  font-size: 0.6rem;
  color: #d78410;
  line-height: 0.7rem;
  text-align: center;

  padding: 0.3rem 0.25rem 0.3rem 0.35rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const TimeIcon = styled.img`
  width: 0.8rem;
  height: 0.8rem;
  flex-shrink: 0;
`;

interface OrderStatusProps {
  endTime?: number;
  data?: {
    isReCard: boolean;
    orderStatus: number;
    noticeStatusText: string;
    noticeDesText: string;
    sysCancel?: string;
  };
  status: boolean;
  onTick: () => void;
}

const OrderStatus: FC<OrderStatusProps> = ({ endTime, data, status, onTick }) => {
  const [countDown, setCountDown] = useState<string>("00:00:00");
  const [countShow, setCountShow] = useState<boolean>(false);
  const countDownRef = useRef<NodeJS.Timeout | null>(null);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (endTime == null) return;
    const currentTime: number = Date.now() / 1000;
    const diffTime = endTime - currentTime;

    if (endTime == null || diffTime <= 1) {
      setCountShow(false);
      if (countDownRef.current) {
        clearInterval(countDownRef.current);
      }
      return;
    }

    const updateCountDown = () => {
      const currentTime = Date.now() / 1000;
      const timeDiff = endTime - currentTime;
      const hours = Math.floor(Math.max(0, timeDiff) / (60 * 60));
      const minutes = Math.floor((Math.max(0, timeDiff) % 3600) / 60);
      const seconds = Math.floor(Math.max(0, timeDiff) % 60);
      const duration = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      setCountDown(duration);
    };

    setCountShow(true);
    countDownRef.current = setInterval(updateCountDown, 1000);

    return () => {
      if (countDownRef.current) {
        clearInterval(countDownRef.current);
      }
    };
  }, [endTime]);

  useEffect(() => {
    if (data && data.orderStatus != 21 && tickRef.current) {
      clearInterval(tickRef.current);
      return;
    }

    tickRef.current = setInterval(() => {
      onTick();
    }, 10000);

    return () => {
      if (tickRef.current) {
        clearInterval(tickRef.current);
      }
    };
  }, [data]);

  return (
    <Container>
      <Title>{data?.noticeStatusText}</Title>
      <SubTitle $status={status}>{data?.noticeDesText}</SubTitle>
      {countShow && (
        <CountDown>
          <TimeIcon src={orderImages.TIME_ICON} />
          {countDown}
        </CountDown>
      )}
    </Container>
  );
};

export { OrderStatus };
