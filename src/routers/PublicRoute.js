import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, component: Component }) => {
  console.log('isAuthenticated', isAuthenticated);
  return (
    <Route
      component={props =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.uid
});

export default connect(mapStateToProps)(PublicRoute);
