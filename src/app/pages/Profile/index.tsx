import { Container } from '@material-ui/core';
import { NavBar } from 'app/components';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="User profile" />
      </Helmet>
      <NavBar />
      <Container component="main">
        <div>Profile</div>
      </Container>
    </>
  );
};

export { Profile };
