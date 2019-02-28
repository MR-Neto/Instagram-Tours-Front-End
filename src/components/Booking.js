import React, { Component } from 'react'

class Booking extends Component {
  render() {
    return (
      <div>
        <input type="date" name="calendar" />
        <h2>Pick 5 locations</h2>
        <div>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
        </div>
        <div>
          <label htmlFor="number-of-people">No of people</label>
          <input type="number" name="number-of-people"/>
          <p>Price: 25 €</p>
          <button type="submit">Confirm</button>
        </div>
      </div>
    )
  }
}

export default Booking;
