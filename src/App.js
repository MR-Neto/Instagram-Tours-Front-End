import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import AnonRoute from './routes/AnonRoute';
import Home from './pages/Home';
import AuthView from './pages/AuthView';
import Profile from './pages/Profile';
import BookingController from './pages/BookingController';

class App extends Component {
 
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute path="/auth" component={AuthView} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/book" component={BookingController} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
