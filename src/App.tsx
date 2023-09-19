import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import FlowCoins from './components/FlowCoins';
import theme from './utils/theme';

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(20,20,30);
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    color: rgb(188, 192, 206);

  }
`;

function App() {
  return (<>

    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <FlowCoins />
    </ThemeProvider>

  </>
  );
}

export default App;
