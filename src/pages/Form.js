import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { withAuth } from "../routes/AuthProvider";
import GoogleLogin from 'react-google-login';
import { Message } from 'semantic-ui-react'


class Form extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    mode: "login",
    messageVisible: false,
    messageText: "",
  };

  handleFormSubmit = event => {
    const { mode } = this.state;
    if (mode === 'signup') {
      const { username, password, name, phoneNumber } = this.state;
      this.props.signup({ username, password, name, phoneNumber })
        .then((signupResponse) => {
          if (signupResponse === "success") {
            this.props.history.goBack();
          } else {
            this.setState({
              messageVisible: true,
              messageText: signupResponse.code
            });
          }
        })
    } else {
      const { username, password } = this.state;
      this.props.login({ username, password })
        .then((loginResponse) => {
          if (loginResponse === "success") {
            this.props.history.goBack();
          } else {
            this.setState({
              messageVisible: true,
              messageText: loginResponse.code
            });
          }
        })
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  responseGoogle = (response) => {
  }

  renderSignUp = () => {
    const { phoneNumber, name, mode } = this.state;
    if (mode === "signup") {
      return (
        <div>
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} />
          <label htmlFor="phoneNumber">Phone</label>
          <input type="number" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} />
        </div>
      );
    }
  };

  singUpForm = () => {
    this.setState({ 
      mode: "signup",
      messageVisible: false,
      messageText: "", 
    });
  }
  loginForm = () => {
    this.setState({ 
      mode: "login",
      messageVisible: false,
      messageText: "",
    });
  }

  handleDismiss = () => {
    this.setState({ messageVisible: false });
  }

  render() {
    const { username, password, mode, messageVisible, messageText } = this.state;

    return (
      <div>
        <Navbar />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={username} onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={this.handleChange} />
        {this.renderSignUp()}
        {mode === "login" && <button name="login" onClick={this.handleFormSubmit}>Log In</button>}
        <button name="signup" onClick={(mode === "login") ? this.singUpForm : this.handleFormSubmit}>Sign Up</button>
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
        <button name="signupFacebook" onClick={this.handleFormSubmit}>Facebook</button>
        {mode === "signup" && <button name="login" onClick={this.loginForm}>Log In</button>}
        {messageVisible && <Message negative onDismiss={this.handleDismiss} header={messageText} />}
      </div>
    );
  }
}

export default withAuth(Form);
