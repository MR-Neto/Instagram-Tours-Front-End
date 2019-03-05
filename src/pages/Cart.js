import React, { Component } from 'react';
import { withAuth } from '../components/AuthProvider';
import { withRouter } from 'react-router-dom'
import Navbar from '../components/Navbar';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import Slideshow from '../components/Slideshow';
import { injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';
import { CardElement } from 'react-stripe-elements';
import dateFns from 'date-fns';
import './Cart.css';

class Cart extends Component {

  state = {
    message: ""
  }

  updateStageHandler = () => {
    this.props.updateStage(null, 0)
  }

  validateBooking(responseMakeBooking) {
    if (responseMakeBooking === 'successful booking') {
      bookingService.clearValues();
      this.props.history.push('/profile');
    } else if (responseMakeBooking === 'payment unsuccessful') {
      this.setState({
        message: "payment unsuccessful"
      });
    } else if (responseMakeBooking === 'tour is full') {
      this.setState({
        message: "tour is full"
      });
    }
  }

  makeBookingHandler = async () => {
    const { isLogged, stripe } = this.props;

    try {
      if (isLogged) {
        const { date, numberOfTickets, placesPicked: places } = bookingService;
        const { data } = await stripe.createToken({ name: 'Jenny Rosen' });
        const token = data.id;
        
        const user = {
          buyer: this.props.user._id,
          numberOfTickets,
        }
        const responseMakeBooking = await tourService.makeBooking({
          details: { date, user, places },
          token,
        });
        this.validateBooking(responseMakeBooking);
      } else {
        console.log(this.props.location);
        this.props.history.push({
          pathname: '/auth',
          state: { from: this.props.location }
        });
      }
    } catch (error) {
      console.log('Error Make booking', error);
    }
  }

  render() {
    const { date, numberOfTickets } = bookingService;

    return (
      <div>
        <div className='topbar'>
          <Navbar />
        </div>
        <Slideshow hasAllPlaces={false} />
        <button onClick={this.updateStageHandler}>Back</button>
        <h2>Your tour</h2>
        {/* <Slideshow hasAllPlaces={false}/> */}
        <p>Date: {dateFns.format(date, 'D MMMM YYYY')}</p>
        <p>People: {numberOfTickets}</p>
        <p>Price: 40 €</p>
        {this.props.isLogged && <CardElement style={{ base: { fontSize: '18px' } }} />}
        <button>Book as guest</button>
        <button onClick={this.makeBookingHandler}>Book</button>
        <p>{this.state.message}</p>
      </div >
    )
  }
}

export default compose(
  withAuth,
  withRouter,
  injectStripe
)(Cart);
