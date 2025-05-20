import { Mask } from "antd-mobile";
import { FC } from "react";
import styled from "styled-components";

import { ModalImages } from "@/assets/images";

const Container = styled.div`
  width: 16.1rem;
  height: 16.85rem;
  margin: 0 auto;
  margin-top: 50%;
  background-image: url(${ModalImages.SCORERESULT_BG});
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 5.35rem 1.05rem 1.35rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  background: rgba(222, 230, 255, 0.56);
  border-radius: 0.5rem;
`;
const Desc = styled.div`
  font-family:
    PingFangSC,
    PingFang SC;
  font-weight: 600;
  font-size: 0.8rem;
  color: #333333;
  line-height: 1.1rem;
  text-align: center;
  font-style: normal;

  padding: 0.6rem;
`;

const ButtonContent = styled.div`
  width: 100%;
  padding: 0 1rem;
`;
const Cancel = styled.div`
  background: #6080f3;
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

interface Props {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const ScoreResultModal: FC<Props> = ({ visible, onClose, children }) => {
  return (
    <Mask
      visible={visible}
      destroyOnClose={true}
      // 是否支持点击遮罩关闭弹窗
      onMaskClick={onClose}
    >
      <Container>
        <Content>
          <Desc>
            {children ||
              "We apologize for not meeting your expectations, but we value your feedback. We will strive to improve and provide you with a better experience."}
          </Desc>
        </Content>
        <ButtonContent>
          <Cancel onClick={onClose}>OK</Cancel>
        </ButtonContent>
      </Container>
    </Mask>
  );
};
export { ScoreResultModal };
