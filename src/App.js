import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
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
            <AnonRoute path="/book" component={BookingController} AppState = {this.state} />
            <AnonRoute path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
