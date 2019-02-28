import React, { Component } from 'react'
import { withAuth } from '../components/AuthProvider';

class Cart extends Component {
  render() {
    return (
      <div>
        <h2>Your tour</h2>
        <div>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
        </div>
        <p>Date: 12/09/2019</p>
        <p>People: 2</p>
        <p>Price: 40 €</p>
        <button>Book</button>
        <button>Book as guest</button>
      </div>
    )
  }
}

export default withAuth(Cart);
