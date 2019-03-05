import React, { Component } from 'react';
import Booking from '../pages/Booking';
import InjectedCheckoutForm from '../pages/Cart';
import bookingService from '../lib/bookingService';
import {Elements} from 'react-stripe-elements';

class BookingController extends Component {

  state = {
    stage: bookingService.stage,
  }

  updateStage = (value, num) => {
    bookingService.setValues(value, num);
    this.setState({
      stage: num,
    });
  }


  render() {
    switch (this.state.stage) {
      case 0:
        return <Booking updateStage={this.updateStage} />
      case 1:
        return (
        <Elements>
          <InjectedCheckoutForm updateStage={this.updateStage}/>
        </Elements>
        )
      default:
        return null
    }
  }
}

export default BookingController;
