import { Mask } from "antd-mobile";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { ModalImages } from "@/assets/images";

const Container = styled.div`
  width: 15.5rem;
  height: 16.9rem;
  margin: 0 auto;
  margin-top: 50%;
  background-image: url(${ModalImages.SCORE_BG});
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 2.75rem 0.85rem 0.85rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-family: Barlow, Barlow;
  font-weight: 800;
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.3rem;
  text-stroke: 3px #a9542a;
  text-align: left;
  font-style: normal;
  text-transform: uppercase;
  -webkit-text-stroke: 3px #a9542a;
`;

const Content = styled.div`
  margin-top: 2rem;
`;
const Desc = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.7rem;
  color: #a9542a;
  line-height: 0.8rem;
  text-align: center;
  font-style: normal;
`;
const StarsContainer = styled.div`
  padding: 1rem 1.45rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.7rem;
`;
const StarImage = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
`;

const ButtonContent = styled.div`
  width: 100%;
  padding: 0 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Submit = styled.div`
  background: #ffa502;
  border-radius: 1.3rem;
  height: 2.6rem;

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.9rem;
  color: #ffffff;
  line-height: 2.6rem;
  text-align: center;
  font-style: normal;
`;
const Cancel = styled.div`
  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 0.9rem;
  color: #ccab63;
  line-height: 1.1rem;
  text-align: center;
  font-style: normal;
`;

interface Props {
  visible?: boolean;
  onClose?: () => void;
  onSubmit: (val: number) => Promise<void> | void;
}

const defaultScoreList = [
  ModalImages.SELECT,
  ModalImages.SELECT,
  ModalImages.SELECT,
  ModalImages.SELECT,
  ModalImages.SELECT,
];

const ScoreModal: FC<Props> = ({ visible, onClose, onSubmit }) => {
  const [scoreList, setScoreList] = useState(defaultScoreList);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setScoreList(defaultScoreList);
    setIndex(0);
  }, [visible]);

  useEffect(() => {
    const newScoreList = scoreList.map((item, i) => {
      return i < index ? ModalImages.SELECTED : ModalImages.SELECT;
    });
    setScoreList(newScoreList);
  }, [index]);

  const handleStarClick = (index: number) => {
    setIndex(index);
  };
  return (
    <Mask
      visible={visible}
      destroyOnClose={true}
      // 是否支持点击遮罩关闭弹窗
      onMaskClick={onClose}
    >
      <Container>
        <Title>PLEASERATEUS</Title>
        <Content>
          <Desc>Light up the stars below so we know your genuine feedback</Desc>
          <StarsContainer>
            {scoreList.map((item, index) => (
              <StarImage key={index} src={item} onClick={() => handleStarClick(index + 1)} />
            ))}
          </StarsContainer>
          <ButtonContent>
            <Submit onClick={() => onSubmit(index)}>Submit</Submit>
            <Cancel onClick={onClose}>Not now</Cancel>
          </ButtonContent>
        </Content>
      </Container>
    </Mask>
  );
};
export { ScoreModal };
