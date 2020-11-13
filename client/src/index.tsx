import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { GlobalStyle } from './assets/GlobalStyle';
import { Confirm, Register } from './pages';

const App: FC = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Switch>
      <Route exact path="/" component={React.Fragment} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/confirm" component={Confirm} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
