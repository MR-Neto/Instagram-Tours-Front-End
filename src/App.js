import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Homepage from './pages/Homepage';
import OrderHistory from './pages/OrderHistory';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute path="/auth/signup" component={Signup} />
            <AnonRoute path="/auth/login" component={Login} />
            <AnonRoute path="/" component={Homepage} />
            <PrivateRoute path="/profile/bookedtours" component={OrderHistory} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
