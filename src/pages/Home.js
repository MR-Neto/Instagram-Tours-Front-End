import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { withAuth } from '../routes/AuthProvider';


class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="hero">
          <p>Slogan</p>
          <Link to="/book" />
        </div>
        <div className="gallery">
          <h4>Places</h4>
          
        </div>
        <div className="social links">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt aperiam, unde officiis reprehenderit, enim dolorem odio sed nulla omnis exercitationem quasi itaque iure accusamus corrupti iusto incidunt, dolorum cum optio!</p>
          <div>
            
          </div>
        </div>
        
      </div>
    )
  }
}

export default withAuth(Home);