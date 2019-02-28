import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './components/AuthProvider';
import Form from './components/Form';
import Booking from './components/Booking';
import Cart from './components/Cart';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <h1>Basic React Authentication</h1>
          <Navbar data='data' />
          <Cart />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
