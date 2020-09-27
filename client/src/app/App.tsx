import React from 'react';
import { ThemeProvider } from 'styled-components';
import { buildTheme } from '@ivoryio/kogaio/utils';

import { GlobalStyle } from 'app/theme/GlobalStyle';
import { kogaioTheme } from 'app/theme/KogaioTheme';
import { Router } from 'app/router/Router';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={buildTheme(kogaioTheme)}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};
