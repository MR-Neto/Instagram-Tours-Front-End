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

  handleFormSubmit = async (formInput) => {
    const { mode } = this.state;
    const { login, signup } = this.props;

    const { username, password, name, phoneNumber } = formInput;

    try {
      const response = ((mode === "signup") ?
        await signup({ username, password, name, phoneNumber }):
        await login({ username, password })
      );
    
      if (response !== "success") {
        this.setState({
          messageVisible: true,
          messageText: response.code,
        });
      }
    }
    catch (error) {
      this.setState({
        messageVisible: true,
        messageText: error.response.data.code,
      });
    }
  };

  responseGoogle = response => {
    const token1 = {
      tokenId: response.tokenId,
    }
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
        <Segment basic textAlign="center" id="form-auth">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_AUTH}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={() => {
              this.setState({
                messageVisible: true,
                messageText: "Google permission denied"
              })
            }}
          />
          <Divider horizontal>Or</Divider>
          <AuthForm mode={mode} handleFormSubmit={this.handleFormSubmit} />
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
