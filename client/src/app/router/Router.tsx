import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthContextProvider } from 'modules/auth/context/AuthContext';
import { NotFound } from './screens/NotFound';
import { Register } from './screens/Register';

export const Router = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/register" exact component={Register} />
          <NotFound />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
