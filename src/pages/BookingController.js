import React, { Component } from 'react';
import Booking from '../pages/Booking';
import Cart from '../pages/Cart';
import bookingService from '../lib/bookingService';

class BookingController extends Component {

  state = {
    stage: 0,
  }

  updateStage = (num, value) => {
    if(value) {
      bookingService.setValues(value);
    }
    this.setState({
      stage: num,
    });
  }


  render() {
    return (
      <div>
        {this.state.stage === 0 && <Booking updateStage={this.updateStage} />}
        {this.state.stage === 1 && <Cart updateStage={this.updateStage} />}
      </div>
    )
  }
}

export default BookingController;
