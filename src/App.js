import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AuthProvider from './routes/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import AnonRoute from './routes/AnonRoute';
import Home from './pages/Home';
import FormView from './pages/FormView';
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
            <AnonRoute path="/auth" component={FormView} />
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
