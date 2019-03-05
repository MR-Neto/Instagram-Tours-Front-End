import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { withAuth } from "../routes/AuthProvider";
import GoogleLogin from 'react-google-login';
import { Message } from 'semantic-ui-react'
import { Button, Form, Divider, Label, Segment, Transition } from 'semantic-ui-react'
import './FormView.css'; // stylecomponents


class FormView extends Component {
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
    console.log("Submit Button");
    const { mode } = this.state;
    if (mode === 'signup') {
      const { username, password, name, phoneNumber } = this.state;
      this.props.signup({ username, password, name, phoneNumber })
        .then((signupResponse) => {
          if (signupResponse === "success") {
            console.log(this.props);
            // this.props.history.push()
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
            // this.props.history.goBack();
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

  toggleFormMode = () => {
    const { mode } = this.state;
    if (mode === "login") {
      this.setState({
        mode: "signup",
        messageVisible: false,
        messageText: "",
      });
    } else {
      this.setState({
        mode: "login",
        messageVisible: false,
        messageText: "",
      });
    }
  }

  handleDismiss = () => {
    this.setState({ messageVisible: false });
  }

  render() {
    const { 
      username,
      password,
      name,
      phoneNumber,
      mode,
      messageVisible,
      messageText
    } = this.state;

    return (
      <div>
        <div className="topbar">
          <Navbar />
        </div>
        <Segment basic textAlign='center'>
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
          <Button name="signupFacebook" onClick={this.handleFormSubmit}>Facebook</Button>
          <Divider horizontal>Or</Divider>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Input label='Username' icon='user' iconPosition='left' type="text" name="username" value={username} onChange={this.handleChange} />
            <Form.Input label='Password' icon='lock' iconPosition='left' type="password" name="password" value={password} onChange={this.handleChange} />
            <Transition.Group animation={mode === 'login' ? 'fade down' : 'fade up'} duration={500}>
              {mode === 'signup' &&
                <div>
                  <Form.Input label='Full Name' type="text" name="name" value={name} onChange={this.handleChange} width={16} />
                  <Form.Input label='Phone' icon='phone' iconPosition='left' type="number" name="phoneNumber" value={phoneNumber} onChange={this.handleChange} width={16} />
                  <Divider horizontal></Divider>
                </div>
              }
              <Form.Button primary name={(mode === "login") ? "login" : "signup"}>{(mode === "login") ? "Log in" : "Sign up"}</Form.Button>
              <Divider horizontal>Or</Divider>
              <Label onClick={this.toggleFormMode}>{(mode === "login") ? "Don't have an account? Sign up!" : "Already have an account? Log in!"}</Label>
            </Transition.Group>
          </Form>
          {messageVisible && <Message negative onDismiss={this.handleDismiss} header={messageText} />}
        </Segment>
      </div>
    );
  }
}

export default withAuth(FormView);
