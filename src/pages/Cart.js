import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import bookingService from '../lib/bookingService';


class Cart extends Component {

  updateStageHandler = () => {
    this.props.updateStage(0)
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
        <button>Book</button>
        <button>Book as guest</button>
      </div>
    )
  }
}

export default withAuth(Cart);
