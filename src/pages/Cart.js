import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import { withRouter } from 'react-router-dom'
import Navbar from '../components/Navbar';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';


class Cart extends Component {

  updateStageHandler = () => {
    this.props.updateStage(null,0)
  }

  makeBookingHandler = () => {
    if(this.props.isLogged){
      const { date, numberOfTickets, placesPicked } = bookingService;
      const booking = {
        date,
        user: {
          buyer: this.props.user._id,
          numberOfTickets,
        },
        places: placesPicked,
      };
      tourService.makeBooking(booking)
        .then(()=>{
          bookingService.clearValues();
          this.props.history.push('/profile');
        });
    } else {
      this.props.history.push('/auth/login');
    }
  }

  render() {
    const { date, numberOfTickets, placesPicked } = bookingService;

    return (
      <div>
        <Navbar />
        <button onClick={this.updateStageHandler}>Back</button>
        <h2>Your tour</h2>
        <div>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
        </div>
        <p>Date: {date}</p>
        <p>People: {numberOfTickets}</p>
        <p>Price: 40 €</p>
        <button onClick={this.makeBookingHandler}>Book</button>
        <button>Book as guest</button>
      </div>
    )
  }
}

export default withRouter(withAuth(Cart));
