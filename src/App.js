import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './pages/Home';
import Form from './pages/Form';
import Booking from './pages/Booking';
import Cart from './pages/Cart';
import Profile from './pages/Profile';


class App extends Component {
  state={

  }

  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute path="/auth/signup" component={Form} />
            <AnonRoute path="/auth/login" component={Form} />
            <AnonRoute path="/book" component={Booking} />
            <AnonRoute path="/book/confirm" component={Cart} />
            <AnonRoute path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
