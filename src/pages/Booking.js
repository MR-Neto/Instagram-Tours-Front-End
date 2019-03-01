import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';



class Booking extends Component {
  


  render() {
    return (
      <div>
        <Navbar />
        <input type="date" name="calendar" value={this.props.date} onChange={this.handleChangeInput}/>
        <h2>Pick 5 locations</h2>
        <div>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
        </div>
        <div>
          <label htmlFor="number-of-people">No of people</label>
          <input type="number" name="numberOfTickets" value={this.props.numberOfTickets} onChange={this.handleChangeInput}/>
          <p>Price: 25 €</p>
          <button type="submit">Confirm</button>
        </div>
      </div>
    )
  }
}

export default withAuth(Booking);
