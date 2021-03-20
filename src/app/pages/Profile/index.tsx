import { Container } from '@material-ui/core';
import { NavBar } from 'app/components';
import React, {useState} from 'react';
import { Helmet } from 'react-helmet-async';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = () => {
  const classes = useStyles();

  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  function validateForm() {
    //TODO: Check whether old password is correct
    return (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      newPassword === repeatPassword
    );
  }

  const handleChangePassword = event => {
      event.preventDefault();
    
      //TODO: api.post, change user's password
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="User profile" />
      </Helmet>
      <NavBar />
      <Container component="main">
        <div>Profile</div>
        <form className={classes.form} onSubmit={handleChangePassword}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="oldpassword"
              label="Old Password"
              name="oldpassword"
              autoComplete="oldpassword"
              autoFocus
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newpassword"
              label="New Password"
              type="password"
              id="newpassword"
              autoComplete="new-password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeatpassword"
              label="Repeat Password"
              type="password"
              id="repeatpassword"
              autoComplete="repeat-password"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              error={newPassword !== repeatPassword && repeatPassword.length > 0}
              helperText={newPassword !== repeatPassword && repeatPassword.length > 0 ? "Incorrectly repeated the new password!" : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!validateForm()}
              className={classes.submit}
            >
              Save Changes
            </Button>           
          </form>
      </Container>
    </>
  );
};

export { Profile };
