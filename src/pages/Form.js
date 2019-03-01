import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';


class Form extends Component {
  state = {
    username: "",
    password: "",
    name:"",
    phoneNumber:"",
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login({ username, password })
      .then(() => {
        this.props.history.push('/private')
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

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
