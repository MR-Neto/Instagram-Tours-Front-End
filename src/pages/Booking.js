import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';
import { Link } from 'react-router-dom';



class Booking extends Component {

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.props.updateCart(name, value)
  }

  render() {

    const { date, numberOfTickets, places } = this.props.AppState;

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
          <p>Price: 25 €</p>
          <Link to="/book/confirm">Confirm</Link>
        </div>
      </div>
    )
  }
}

export default withAuth(Booking);
