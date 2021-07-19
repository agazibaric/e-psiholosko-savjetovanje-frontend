import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Helmet } from 'react-helmet-async';
import {
  Button,
  Checkbox,
  FormControlLabel,
  NavBar,
  TextField,
  Typography,
} from 'app/components';
import { connect, useDispatch } from 'react-redux';
import { userActions } from 'actions';
import { useHistory } from 'react-router-dom';

export interface LoginForm {
  username: string;
  password: string;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = props => {
  const classes = useStyles();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = e => {
    e.preventDefault();

    if (username && password) {
      dispatch(userActions.login(username, password));
      history.push('/');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login with your user account" />
      </Helmet>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="rememberMe" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { login } = state;
  return {
    login,
  };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };
