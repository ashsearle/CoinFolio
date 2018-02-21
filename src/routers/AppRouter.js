import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import MainNav from '../components/nav/MainNav';
import CurrenciesPage from '../pages/CurrenciesPage';
import PortfolioPage from '../pages/PortfolioPage';
import PortfolioItem from '../pages/PortfolioItem';
import NotFoundPage from '../pages/NotFoundPage';

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
