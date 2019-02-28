import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Homepage from './pages/Homepage';
import OrderHistory from './pages/OrderHistory';
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
<<<<<<< HEAD
=======
          <h1>Basic React Authentication</h1>
          <Navbar data='data' />
          <Cart />
>>>>>>> 29eef31d86e8c538caacfc462de03012beed7ddb
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
