import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { withAuth } from "../components/AuthProvider";

class Form extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props
      .login({ username, password })
      .then(() => {
        this.props.history.push("/private");
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  renderSignUp = () => {
    const { url } = this.props.match;
    if (url === "/auth/signup") {
      return (
        <div>
          <label htmlFor="full-name">Full Name</label>
          <input type="text" name="full-name" />
          <label htmlFor="contact">Phone</label>
          <input type="number" name="contact" />
        </div>
      );
    }
  };

  renderSubmitButton = () => this.props.match.url === "/auth/signup" ? "Sign Up" : "Log In";
  
  render() {
    const { url } = this.props.match;

    return (
      <div>
        <Navbar />
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          {this.renderSignUp()}
          <button type="submit">{this.renderSubmitButton()}</button>
        </form>
      </div>
    );
  }
}

export default withAuth(Form);
