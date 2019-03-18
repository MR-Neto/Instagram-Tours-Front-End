import React, { Component } from 'react';
import authService from '../lib/authService';
import { Dimmer, Loader } from 'semantic-ui-react'
import './AuthProvider.css';


export const AuthContext = React.createContext(
  // authStore // default value
);

export const { Provider, Consumer } = AuthContext;

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {(authStore) => {
            return <Comp
              isLogged={authStore.isLogged}
              user={authStore.user}
              logout={authStore.logout}
              login={authStore.login}
              signup={authStore.signup}
              initGoogle={authStore.initGoogle}
              {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}

export default class AuthProvider extends Component {
  state = {
    isLogged: false,
    user: {},
    status: 'loading'
  }

  setUser = (user) => {
    this.setState({
      isLogged: true,
      user,
    })
  }

  loginUser = (body) => {
    return authService.login(body)
      .then(({ data }) => {
        console.log("log in front end",data);
        this.setUser(data);
        return data;
      })
  }

  signupUser = (body) => {
    return authService.signup(body)
      .then(({ data }) => {
        this.setUser(data);
        return data;
      })
  }

  initGoogle = async (body) => {
    const { data } = await authService.initGoogle(body);
    this.setUser(data);
    return data;
  }

  logoutUser = () => {
    return authService.logout()
      .then(() => {
        this.setState({
          isLogged: false,
          user: {},
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    authService.me()
      .then((user) => {
        if (user) {
          this.setState({
            isLogged: true,
            user,
            status: 'loaded'
          })
        } else {
          this.setState({
            isLogged: false,
            status: 'loaded'
          })
        }
      })
      .catch((error) => {
        this.setState({
          isLogged: false,
          user: {},
          status: 'loaded'
        });
      })
  }

  render() {
    const { isLogged, user, status } = this.state;
    const { children } = this.props;
    switch (status) {
      case 'loading':
        return (
          <div className="loader-container">
             <Dimmer active>
               <Loader />
             </Dimmer>
          </div>
        )
      default:
        return (
          <Provider value={
            {
              isLogged,
              user,
              logout: this.logoutUser,
              login: this.loginUser,
              signup: this.signupUser,
              initGoogle: this.initGoogle,
              setUser: this.setUser,
            }}>
            {children}
          </Provider>
        );
    }
  }
}
