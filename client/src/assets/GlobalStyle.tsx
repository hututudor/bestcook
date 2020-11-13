import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: ${colors.blue_grey_050}
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
