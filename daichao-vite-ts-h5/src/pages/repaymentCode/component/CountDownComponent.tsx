import { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { repaymentCodeImages } from "@/assets/images";

const Contianer = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const RepayDateContent = styled.div`
  padding: 0 1.5rem;
`;
const RepayDate = styled.div`
  height: 2.35rem;
  background-image: url(${repaymentCodeImages.DATE_BG});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TimeRanges = styled.div`
  flex: 1;
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1.1rem;
  color: #ff8800;
  line-height: 1.3rem;
  text-align: center;
  font-style: normal;
`;

const Reminder = styled.div`
  margin: 0 
  font-size: 0.6rem;
  color: #a3a3a3;
  line-height: 0.75rem;
  text-align: center;
  font-style: normal;
`;

interface CountDownProps {
  endTime?: number;
  note?: string;
}

const CountDownComponent: FC<CountDownProps> = ({ endTime, note }) => {
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");
  const [seconds, setSeconds] = useState<string>("00");
  const countDownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (endTime == null) return;
    const currentTime: number = Date.now() / 1000;
    const diffTime = endTime - currentTime;

    if (endTime == null || diffTime <= 1) {
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
      setHours(String(hours).padStart(2, "0"));
      setMinutes(String(minutes).padStart(2, "0"));
      setSeconds(String(seconds).padStart(2, "0"));
    };

    countDownRef.current = setInterval(updateCountDown, 1000);

    return () => {
      if (countDownRef.current) {
        clearInterval(countDownRef.current);
      }
    };
  }, [endTime]);

  return (
    <Contianer>
      <RepayDateContent>
        <RepayDate>
          <TimeRanges>{hours}</TimeRanges>
          <TimeRanges>{minutes}</TimeRanges>
          <TimeRanges>{seconds}</TimeRanges>
        </RepayDate>
      </RepayDateContent>
      {note && <Reminder dangerouslySetInnerHTML={{ __html: note }} />}
    </Contianer>
  );
};

export { CountDownComponent };
