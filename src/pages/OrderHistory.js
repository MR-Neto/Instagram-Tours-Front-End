import React, { Component } from 'react'
import Navbar from '../components/Navbar';


export default class OrderHistory extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h3>Booked Tours</h3>
        <ul>
          <li>Booked Tour1</li>
          <li>Booked Tour2</li>
          <li>Booked Tour3</li>
        </ul>
      </div>
    )
  }
}
