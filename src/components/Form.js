import React, { Component } from 'react'

class Form extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="email">Email</label>
          <input type="text" name="email"/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password"/>
          <label htmlFor="contact">Phone</label>
          <input type="number" name="contact"/>
          <button type="submit">Sign Up</button>
        </form>
        
      </div>
    )
  }
}


export default Form;
