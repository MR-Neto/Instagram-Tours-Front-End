import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { withAuth } from "../routes/AuthProvider";

class Form extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if(event.target.name === 'Sign Up') {
      this.props
        .signup(this.state)
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
    const { url } = this.props.match;
    const { phoneNumber, name } = this.state;

    if (url === "/auth/signup") {
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

  renderSubmitButton = () => this.props.match.url === "/auth/signup" ? "Sign Up" : "Log In";
  
  render() {
    const { username, password } = this.state;

    return (
      <div>
        <Navbar />
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          {this.renderSignUp()}
          <button name ={this.renderSubmitButton()} onClick={this.handleFormSubmit}>{this.renderSubmitButton()}</button>
        </form>
      </div>
    );
  }
}

export default withAuth(Form);
