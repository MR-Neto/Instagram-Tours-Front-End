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
    return (
      <div>
        {this.state.stage === 0 && <Booking updateStage={this.updateStage} />}
        {this.state.stage === 1 &&
          <Elements>
            <InjectedCheckoutForm updateStage={this.updateStage}/>
          </Elements>        
        }
      </div>
    )
  }
}

export default BookingController;
