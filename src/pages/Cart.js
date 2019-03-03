import React, { Component } from 'react';
import { withAuth } from '../routes/AuthProvider';
import { withRouter } from 'react-router-dom'
import Navbar from '../components/Navbar';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import { injectStripe } from 'react-stripe-elements';
import { CardElement } from 'react-stripe-elements';


class Cart extends Component {

  state ={
    message:""
  }

  updateStageHandler = () => {
    this.props.updateStage(null, 0)
  }

  makeBookingHandler = async () => {

    try {
      if (this.props.isLogged) {

        const { date, numberOfTickets, placesPicked } = bookingService;
        const { token } = await this.props.stripe.createToken({ name: 'Jenny Rosen' });
        console.log("FRONT END TOKEN:",token);
        const booking = {
          details: {
            date,
            user: {
              buyer: this.props.user._id,
              numberOfTickets,
            },
            places: placesPicked,
          },
          token,
        };
        
        const responseMakeBooking = await tourService.makeBooking(booking);
        console.log("Response MakingBooking ", responseMakeBooking);
        if (responseMakeBooking === 'successful booking') {
          bookingService.clearValues();
          this.props.history.push('/profile');
        } else if (responseMakeBooking === 'payment unsuccessful') { 
          this.setState({
            message:"payment unsuccessful"
          });
        } else if (responseMakeBooking === 'tour is full') { 
          this.setState({
            message:"tour is full"
          });
        } 
      } else {
        this.props.history.push('/auth/login');
      }
    } catch (error) {
      console.log('Error Make booking', error);
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
        {this.props.isLogged && <CardElement style={{ base: { fontSize: '18px' } }} />}
        <button>Book as guest</button>
        <button onClick={this.makeBookingHandler}>Book</button>
        <p>{this.state.message}</p>
      </div >
    )
  }
}

export default injectStripe(withRouter(withAuth(Cart)));
