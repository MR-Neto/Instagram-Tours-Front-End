import React, { Component } from 'react';
import Booking from '../pages/Booking';
import InjectedCheckoutForm from '../pages/Cart';
import bookingService from '../lib/Booking/bookingService';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux'
import { incrementStage, decrementStage } from '../lib/Booking/actions'


class BookingController extends Component {

  state = {
    stage: bookingService.stage,
  }

  updateStage = (value, num) => {
    bookingService.setValues(value, num);
    (num === 1 ? this.props.incrementStage() : this.props.decrementStage());
    
    // this.setState({
    //   stage: num,
    // });
  }


  render() {
    switch (this.props.stage) {
      case 0:
        return <Booking updateStage={this.updateStage} />
      case 1:
        return (
          <Elements>
            <InjectedCheckoutForm updateStage={this.updateStage} />
          </Elements>
        )
      default:
        return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.stage
  }
}

const mapDispatchToProps = {
  incrementStage,
  decrementStage,
}



export default connect(mapStateToProps,mapDispatchToProps)(BookingController);




