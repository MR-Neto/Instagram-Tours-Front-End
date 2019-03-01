import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './pages/Home';
import Form from './pages/Form';
import Booking from './pages/Booking';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import placesService from './lib/placesService';


class App extends Component {
  state = {
    date: "",
    placesPicked: [],
    numberOfTickets: 0,
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
  
  updateCart = (name, value) => {
    this.setState({
      [name]:value
    });
  }

  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute path="/auth/signup" component={Form} />
            <AnonRoute path="/auth/login" component={Form} />
            <AnonRoute path="/book/confirm" component={Cart} AppState = {this.state} />
            <AnonRoute path="/book" component={Booking} updateCart={this.updateCart} AppState = {this.state} />
            <AnonRoute path="/" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
