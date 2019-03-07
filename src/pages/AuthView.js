import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { withAuth } from "../components/AuthProvider";
import GoogleLogin from "react-google-login";
import {
  Divider,
  Label,
  Segment,
  Message,
} from "semantic-ui-react";
import "./AuthView.css"; // stylecomponents
import AuthForm from '../components/AuthForm';

class FormView extends Component {
  state = {
    mode: "login",
    messageVisible: false,
    messageText: ""
  };

  handleFormSubmit = (formInput) => {
    const { mode } = this.state;
    if (mode === "signup") {
      const { username, password, name, phoneNumber } = formInput;
      this.props.signup({ username, password, name, phoneNumber })
        .then(signupResponse => {
          if (signupResponse !== "success") {
            this.setState({
              messageVisible: true,
              messageText: signupResponse.code,
            });
          }
        })
        .catch(error => {
          this.setState({
            messageVisible: true,
            messageText: error,
          });
        });
    } else {
      const { username, password } = formInput;
      this.props.login({ username, password })
        .then(loginResponse => {
          if (loginResponse !== "success") {
            this.setState({
              messageVisible: true,
              messageText: loginResponse.code,
            });
          }
        })
        .catch(error => {
          this.setState({
            messageVisible: true,
            messageText: error,
          });
        });
    }
  };

  responseGoogle = response => {
    const token1 = {
      tokenId: response.tokenId,
    }
    // this.props.setUser();
    this.props.initGoogle(token1);
  };

  toggleFormMode = () => {
    const { mode } = this.state;
    if (mode === "login") {
      this.setState({
        mode: "signup",
        messageVisible: false,
        messageText: ""
      });
    } else {
      this.setState({
        mode: "login",
        messageVisible: false,
        messageText: ""
      });
    }
  };

  handleDismiss = () => {
    this.setState({ messageVisible: false });
  };

  render() {
    const {
      mode,
      messageVisible,
      messageText
    } = this.state;

    return (
      <div>
        <div className="topbar">
          <Navbar />
        </div>
        <Segment basic textAlign="center">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_AUTH}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={()=>{
              this.setState({
                messageVisible: true,
                messageText: "Google permission denied"
              })
            }}
          />
          <Divider horizontal>Or</Divider>
          <AuthForm mode={mode} handleFormSubmit={this.handleFormSubmit} />
          <Divider horizontal>Or</Divider>
          <Label onClick={this.toggleFormMode}>
            {mode === "login"
              ? "Don't have an account? Sign up!"
              : "Already have an account? Log in!"}
          </Label>
          {messageVisible && (
            <Message
              negative
              onDismiss={this.handleDismiss}
              header={messageText}
            />
          )}
        </Segment>
      </div>
    );
  }
}

export default withAuth(FormView);
