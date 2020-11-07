"use strict"

const user = new UserForm();

user.loginFormCallback = data => 
  ApiConnector.login(data, callback => {
  callback.success ?
  location.reload():    
  user.setLoginErrorMessage(callback.error);
});

user.registerFormCallback = data => 
  ApiConnector.register(data, callback => {
  callback.success ?
  location.reload():    
  user.setRegisterErrorMessage(callback.error);
});