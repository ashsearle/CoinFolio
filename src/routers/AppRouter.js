import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import MainNav from '../components/MainNav';
import CurrenciesPage from '../components/CurrenciesPage';
import PortfolioPage from '../components/PortfolioPage';
import NotFoundPage from '../components/NotFoundPage';

import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <MainNav />
      <Switch>
        <Route path="/" component={CurrenciesPage} exact={true} />
        <PrivateRoute path="/portfolio" component={PortfolioPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;