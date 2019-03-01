import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';
import bookingService from '../lib/bookingService';

class Booking extends Component {

  state = {
    date: bookingService.date,
    numberOfTickets: bookingService.numberOfTickets,
    placesPicked: bookingService.placesPicked,
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  updateStageHandler = () => {
    this.props.updateStage(1, this.state);
  }

  render() {
    const { date, numberOfTickets, placesPicked } = this.state;

    return (
      <div>
        <Navbar />
        <input type="date" name="date" value={date} onChange={this.handleChangeInput} />
        <h2>Pick 5 locations</h2>
        <div>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
        </div>
        <div>
          <label htmlFor="number-of-people">No of people</label>
          <input type="number" name="numberOfTickets" value={numberOfTickets} onChange={this.handleChangeInput} />
          <p>Price: {25*numberOfTickets} €</p>
          <button onClick={this.updateStageHandler}>Confirm</button>
        </div>
      </div>
    )
  }
}

export default withAuth(Booking);
