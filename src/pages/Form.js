import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';


class Form extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="contact">Phone</label>
          <input type="number" name="contact" />
          <button type="submit">Sign Up</button>
        </form>

      </div>
    )
  }
}


export default withAuth(Form);
