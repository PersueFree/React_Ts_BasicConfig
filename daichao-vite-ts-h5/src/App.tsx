import { FC, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import { RouterConfig } from "@/router/routerConfig";
import { getQueryParams } from "@/utils/getQueryParams";

const AppContainer = styled.div`
  width: 100%;
`;

const App: FC = () => {
  useEffect(() => {
    console.log(getQueryParams());
  }, []);

  return (
    <HashRouter>
      <AppContainer>
        <Routes>
          <Route path={RouterConfig.CONFIRM_OF_LOAN} element={<>HELLO TYPESCRIPT</>} />
        </Routes>
      </AppContainer>
    </HashRouter>
  );
};

export default App;
