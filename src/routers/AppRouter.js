import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import MainNav from '../containers/MainNav';
import SideNav from '../containers/SideNav';
import CurrenciesPage from '../containers/CurrenciesPage';
import LoginPage from '../containers/LoginPage';
import PortfolioPage from '../containers/PortfolioPage';
import PortfolioItem from '../containers/PortfolioItem';
import NotFoundPage from '../containers/NotFoundPage';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <MainNav />
      <SideNav />
      <Switch>
        <Route path="/" component={CurrenciesPage} exact={true} />
        <PublicRoute path="/login" component={LoginPage} />
        <PrivateRoute
          path="/portfolio"
          component={PortfolioPage}
          exact={true}
        />
        <PrivateRoute
          path="/portfolio/:id"
          component={PortfolioItem}
          exact={true}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
