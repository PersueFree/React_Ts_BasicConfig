import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleSheetManager } from "styled-components";
import { ThemeProvider } from "styled-components";

import theme from "@/styles/theme";

import App from "@/App";
import "./index.less";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleSheetManager enableVendorPrefixes={true} shouldForwardProp={() => true}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyleSheetManager>
  </StrictMode>,
);
