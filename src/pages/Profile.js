import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import OrderHistory from '../components/OrderHistory';
import { withAuth } from '../components/AuthProvider';

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <OrderHistory />
      </div>
    )
  }
}

export default withAuth(Profile);