import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { NotFound } from './screens/NotFound';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <NotFound />
      </Switch>
    </BrowserRouter>
  );
};
