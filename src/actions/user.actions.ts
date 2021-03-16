import { history } from 'helpers';
import { userService } from 'services';
import { User } from 'types/User';
import { userConstants } from '../constants';
import { alertActions } from './';

export const userActions = {
  login,
  logout,
};

function login(username: string, password: string) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      token => {
        userService.getUser().then((user: User) => {
          dispatch(success(user));
          history.push('/');
        });
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
