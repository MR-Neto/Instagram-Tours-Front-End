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
import { Button, Message } from 'semantic-ui-react'
import dateFns from 'date-fns';
import './Cart.css';

class Cart extends Component {

  state = {
    messageText: false,
    messageType: "",
  }

  updateStageHandler = () => {
    this.props.updateStage(null, 0);
    bookingService.resetPlacesPicked();
  }

  validateBooking(responseMakeBooking) {
    if (responseMakeBooking.code === 'successful booking') {
      bookingService.clearValues();
      this.setState = {
        messageText: "Successful Booking!",
        messageType: 'positive',
      }
    } else if (responseMakeBooking === 'payment unsuccessful') {
      this.setState({
        messageText: "payment unsuccessful",
        messageType: 'negative',
      });
    } else if (responseMakeBooking === 'tour is full') {
      this.setState({
        messageText: "tour is full",
        messageType: 'negative',
      });
    }
  }

  handleDismiss = () => {
    this.setState({ messageText: false });
  };

  makeBookingHandler = async () => {
    const { isLogged, stripe } = this.props;

    try {
      if (isLogged) {
        const { date, numberOfTickets, placesPicked: places } = bookingService;
        const { name } = this.props.user;

        const data = await stripe.createToken({
          name
        });

        const token = data.token.id;

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
      this.setState({
        messageText: "Booking unsuccessful",
        messageType: 'negative',
      });
    }
  }

  render() {
    const { date, numberOfTickets } = bookingService;
    const { messageText, messageType } = this.state;

    return (
      <div>
        <div className='topbar'>
          <Navbar />
        </div>
        <Slideshow hasAllPlaces={false} readOnly={true} />
        <h2>Your tour</h2>
        {/* <Slideshow hasAllPlaces={false}/> */}
        <p>Date: {dateFns.format(date, 'D MMMM YYYY')}</p>
        <p>People: {numberOfTickets}</p>
        <p>Price: {numberOfTickets * 25}€</p>
        {this.props.isLogged && <CardElement style={{ base: { fontSize: '18px' } }} />}
        <Button basic onClick={this.updateStageHandler}>Back</Button>
        <Button positive onClick={this.makeBookingHandler}>Book</Button>
        {messageText &&
          <Message negative={messageType==='negative'} positive={messageType==='positive'} onDismiss={this.handleDismiss}>
            <Message.Header>{messageText}</Message.Header>
          </Message>
        }
      </div >
    )
  }
}

export default compose(
  withAuth,
  withRouter,
  injectStripe
)(Cart);
