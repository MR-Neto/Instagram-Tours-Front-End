import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AuthProvider from './routes/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import AnonRoute from './routes/AnonRoute';
import Home from './pages/Home';
import Form from './pages/Form';
import Profile from './pages/Profile';
import BookingController from './pages/BookingController';
import placesService from './lib/placesService';

class App extends Component {
  state = {
    placesList:[]
  }

  componentDidMount(){
    placesService.getAllPlaces()
    .then((placesList)=>{
      this.setState({
        placesList
      });
    });
  }
  
 
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute path="/auth/signup" component={Form} />
            <AnonRoute path="/auth/login" component={Form} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/book" component={BookingController} AppState = {this.state} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
