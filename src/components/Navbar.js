import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../components/AuthProvider';

class Navbar extends Component {
  render() {
    const { isLogged, logout } = this.props;

    if (isLogged) {
      return (
        <nav>
          <button>Back</button>
          <h1>Tours</h1>
          <a href="#" onClick={logout}>Menu</a>
          <Link to="/">Home</Link>
          <Link to="/book">Book tour</Link>
          <a href="#" onClick={logout}>Logout</a>
        </nav>
      );
    } else {
      return (
        <nav>
          <button>Back</button>
          <h1>Tours</h1>
          <a href="#" onClick={logout}>Menu</a>
          <Link to="/">Home</Link>
          <Link to="/book">Book tour</Link>
          <Link to="/auth/login">Log In</Link>
          <Link to="/auth/signup">Sign Up</Link>
        </nav>
      );
    }
  }
}

export default withAuth(Navbar);
