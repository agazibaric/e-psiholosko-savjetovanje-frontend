/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { Login, Profile, Register } from './pages';
import { PrivateRoute } from './components/PrivateRoute';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - E Psychological Counseling"
        defaultTitle="E Psychological Counseling"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="Application for online Psychological Counseling"
        />
      </Helmet>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/login'}
          component={Login}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/register'}
          component={Register}
        />
        <PrivateRoute exact path="/profile" component={Profile} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
