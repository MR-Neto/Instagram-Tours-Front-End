import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { withAuth } from "../routes/AuthProvider";

class Form extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    mode: "login",
  };

  handleFormSubmit = event => {
    const { mode } = this.state;
    if (mode === 'signup') {
      const { username, password, name, phoneNumber } = this.state;
      this.props
        .signup({ username, password, name, phoneNumber })
        .then(() => {
          this.props.history.goBack();
        })
        .catch(error => console.log(error));
    } else {
      const { username, password } = this.state;
      this.props
        .login({ username, password })
        .then(() => {
          this.props.history.goBack();
        })
        .catch(error => console.log(error));
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

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
    this.setState({ mode: "signup" });
  }
  loginForm = () => {
    this.setState({ mode: "login" });
  }

  render() {
    const { username, password, mode } = this.state;

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
        <button name="signupGoogle" onClick={this.handleFormSubmit}>Google</button>
        <button name="signupFacebook" onClick={this.handleFormSubmit}>Facebook</button>
        {mode === "signup" && <button name="login" onClick={this.loginForm}>Log In</button>}
      </div>
    );
  }
}

export default withAuth(Form);
