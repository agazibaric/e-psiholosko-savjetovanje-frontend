import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LocalStorage } from 'services';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      LocalStorage.getUserToken() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
