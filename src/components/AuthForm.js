import React, { Component } from 'react';
import {
  Form,
  Divider,
  Transition,
} from "semantic-ui-react";

class AuthForm extends Component {

  state = {
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    isUsernameIncorrect: false,
    isPasswordIncorrect: false,
    isNameIncorrect: false,
    isPhoneNumberIncorrect: false,
  }

  handleFormSubmit = () => {
    const { handleFormSubmit, mode } = this.props;
    const {
      username,
      password,
      name,
      phoneNumber,
    } = this.state;

    if (mode === "login" && username && password) {
      handleFormSubmit(this.state);
    }

    if (mode === "signup" && username && password && phoneNumber && name) {
      handleFormSubmit(this.state);
    }

    if (!username) {
      this.setState({
        isUsernameIncorrect: true,
      });
    }
    if (!password) {
      this.setState({
        isPasswordIncorrect: true,
      });
    }
    if (!phoneNumber && mode === "signup") {
      this.setState({
        isPhoneNumberIncorrect: true,
      });
    }
    if (!name && mode === "signup") {
      this.setState({
        isNameIncorrect: true,
      });
    }
  }


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFocus = event => {
    const { name } = event.target;

    switch (name) {
      case 'username':
        this.setState({
          isUsernameIncorrect: false,
        });
        break;
      case 'name':
        this.setState({
          isNameIncorrect: false,
        });
        break;
      case 'password':
        this.setState({
          isPasswordIncorrect: false,
        });
        break;

      case 'phoneNumber':
        this.setState({
          isPhoneNumberIncorrect: false,
        });
        break;
      default:
        break;
    }

  };

  render() {
    const {
      username,
      password,
      name,
      phoneNumber,
      isUsernameIncorrect,
      isPasswordIncorrect,
      isNameIncorrect,
      isPhoneNumberIncorrect,
    } = this.state;
    const { mode } = this.props;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Input
          error={isUsernameIncorrect}
          label="Username"
          icon="user"
          iconPosition="left"
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange}
          onClick={this.handleFocus}
        />
        <Form.Input
          error={isPasswordIncorrect}
          label="Password"
          icon="lock"
          iconPosition="left"
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
          onClick={this.handleFocus}
        />
        <Transition.Group
          animation={mode === "login" ? "fade down" : "fade up"}
          duration={500}
        >
          {mode === "signup" && (
            <div>
              <Form.Input
                error={isNameIncorrect}
                label="Full Name"
                icon="user"
                iconPosition="left"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                width={16}
                onClick={this.handleFocus}
              />
              <Form.Input
                error={isPhoneNumberIncorrect}
                label="Phone"
                icon="phone"
                iconPosition="left"
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
                width={16}
                onClick={this.handleFocus}
              />
              <Divider horizontal />
            </div>
          )}
          <Form.Button  name={mode === "login" ? "login" : "signup"}>
            {mode === "login" ? "Log in" : "Sign up"}
          </Form.Button>
        </Transition.Group>
      </Form>
    );
  }
}

export default AuthForm;
