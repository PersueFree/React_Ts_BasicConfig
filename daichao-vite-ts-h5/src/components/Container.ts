import styled from "styled-components";

interface Props {
  $background?: string;
  $paddingBottom?: string;
  $paddingTop?: string;
  $flex?: string;
}

export const Container = styled.div<Props>`
  max-width: 750px;
  margin: 0 auto;
  background: ${(props) => props.$background || "#ffffff"};
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  padding: ${(props) => props.$paddingTop || "0.75rem 0.75rem"}
    ${(props) => props.$paddingBottom || "6rem"};

  display: flex;
  flex-direction: column;
  ${(props) => props.$flex}
  gap: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;
