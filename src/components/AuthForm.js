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
  }

  handleFormSubmit = () => {
    const { handleFormSubmit } = this.props;
    handleFormSubmit(this.state);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      username,
      password,
      name,
      phoneNumber,
    } = this.state;
    const { mode } = this.props;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Input
          label="Username"
          icon="user"
          iconPosition="left"
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange}
        />
        <Form.Input
          label="Password"
          icon="lock"
          iconPosition="left"
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <Transition.Group
          animation={mode === "login" ? "fade down" : "fade up"}
          duration={500}
        >
          {mode === "signup" && (
            <div>
              <Form.Input
                label="Full Name"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                width={16}
              />
              <Form.Input
                label="Phone"
                icon="phone"
                iconPosition="left"
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
                width={16}
              />
              <Divider horizontal />
            </div>
          )}
          <Form.Button primary name={mode === "login" ? "login" : "signup"}>
            {mode === "login" ? "Log in" : "Sign up"}
          </Form.Button>
        </Transition.Group>
      </Form>
    );
  }
}

export default AuthForm;
