import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import MainNav from '../containers/MainNav';
import CurrenciesPage from '../containers/CurrenciesPage';
import PortfolioPage from '../containers/PortfolioPage';
import PortfolioItem from '../containers/PortfolioItem';
import NotFoundPage from '../containers/NotFoundPage';

import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <MainNav />
      <Switch>
        <Route path="/" component={CurrenciesPage} exact={true} />
        <PrivateRoute
          path="/portfolio"
          component={PortfolioPage}
          exact={true}
        />
        <PrivateRoute path="/portfolio/:id" component={PortfolioItem} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
