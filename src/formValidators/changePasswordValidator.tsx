const validators = {
    validateForm,
}

function validateForm(oldPassword: string, newPassword: string, repeatPassword: string) {
    //TODO: Check whether old password is correct
    return (
      oldPassword.length > 0 &&
      newPassword.length > 0 &&
      newPassword === repeatPassword
    );
  }

export { validateForm };