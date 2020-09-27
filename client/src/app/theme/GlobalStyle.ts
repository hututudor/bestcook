import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@ivoryio/kogaio/utils';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: ${themeGet('space.0')}px;
    padding: ${themeGet('space.0')}px;
    font-family: ${themeGet('fonts.primary')};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: ${themeGet('colors.grey_050')}
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
