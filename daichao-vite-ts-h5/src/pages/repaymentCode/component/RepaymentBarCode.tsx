import { FC } from "react";
import Barcode from "react-barcode";
import styled from "styled-components";

const RepaymentBarcode = styled.div`
  width: 100%;
  padding: 0.8rem;

  background: #ffffff;
  border: 1px solid #634fc6;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const RepayBarcodeTitle = styled.span`
  font-weight: bold;
  font-size: 0.7rem;
  color: #2a2a29;
  line-height: 0.9rem;
  text-align: left;
  font-style: normal;
`;
const InternalBarcode = styled(Barcode)`
  width: 100%;
  height: 100%;
`;

const RepaymentBarCode: FC<{ value?: string }> = ({ value }) => {
  return (
    <RepaymentBarcode>
      <RepayBarcodeTitle>Barcode</RepayBarcodeTitle>
      <InternalBarcode
        value={value || ""}
        //  不显示原始值
        displayValue={false}
        //  背景色
        background='#ffffff'
        // 线条颜色
        lineColor='#2A292A'
        // 线条宽度
        width={2}
      />
    </RepaymentBarcode>
  );
};
export { RepaymentBarCode };
