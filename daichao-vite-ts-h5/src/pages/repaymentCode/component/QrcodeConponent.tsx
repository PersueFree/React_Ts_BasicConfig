import { QRCodeCanvas } from "qrcode.react";
import { FC, useRef } from "react";
import styled from "styled-components";

import nativeUtils from "@/utils/nativeUtils";

import { saveQrcodeRecord } from "@/api";
import { Toast } from "@/components";

const QrcodeContainer = styled.div`
  z-index: 100;
  height: 9.25rem;
  width: 9.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #634fc6;
  border-radius: 0.8rem;
  background: #ffffff;
`;
const Image = styled.img`
  width: 8.75rem;
  height: 8.75rem;
  border-radius: 0.5rem;
`;
const Qrcode = styled(QRCodeCanvas)`
  width: 8.75rem;
  height: 8.75rem;

  & > canvas {
    width: 8.75rem;
    height: 8.75rem;
  }
`;
const HomeButton = styled.div`
  margin-top: 0.5rem;
  width: 80%;
  height: 2.5rem;
  background: linear-gradient(135deg, #3d3bb4 0%, #a672e6 100%);
  box-shadow: 0px 2px 4px 0px #bcb7e5;
  border-radius: 1.25rem;
  border: 0.15rem solid rgba(214, 225, 218, 0.26);

  font-family: Helvetica, Helvetica;
  font-weight: bold;
  font-size: 1rem;
  color: #ffd737;
  line-height: 1.2rem;
  text-align: center;
  font-style: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const QrcodeConponent: FC<{ codeUrl?: string; codeData?: string }> = ({ codeUrl, codeData }) => {
  const qrcodeRef = useRef<HTMLCanvasElement>(null);

  const handleSaveQrcodeRecord = async () => {
    saveQrcodeRecord(codeUrl || codeData)
      .then()
      .catch((err) => {
        if (err instanceof Error) {
          Toast.show(err.message);
        }
      });
    const dataURL = codeUrl || (qrcodeRef.current && qrcodeRef.current.toDataURL("image/png"));
    nativeUtils.saveQrcode(dataURL);
  };

  return (
    <>
      <QrcodeContainer>
        {codeUrl && <Image src={codeUrl} />}
        {!codeUrl && codeData && (
          <Qrcode size={175} ref={qrcodeRef} className='qrcode' level='M' value={codeData} />
        )}
      </QrcodeContainer>
      <HomeButton onClick={() => handleSaveQrcodeRecord()}>Confirm Payment</HomeButton>
    </>
  );
};
export { QrcodeConponent };
