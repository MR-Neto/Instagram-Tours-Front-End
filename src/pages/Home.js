import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { withAuth } from '../routes/AuthProvider';
import './Home.css';
import { Button } from 'semantic-ui-react'
import { Transition } from 'semantic-ui-react'


class Home extends Component {
  state = {
    visible: false,
  }

  componentDidMount = () => {
    this.setState({
      visible: true,
    })

  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Transition.Group animation='fade down' duration={1000}>
          {visible === true &&
            <div>
              <div className="hero">
                <div>
                <Navbar />
                </div>
                <div className="title">
                  <i>Discover Barcelona Top Instagram Places</i>
                </div>
                <Link to="/book">
                  <Button size='big' primary>
                    Book now
                  </Button>
                </Link>
              </div>
              <div className='contact'>
                <h2>Contact Us</h2>
                <p>9232183921</p>
                <p>support@instagram-tours.com</p>
                <div>
                  <Button circular color='instagram' icon='instagram' />
                  <Button circular color='facebook' icon='facebook' />
                  <Button circular color='twitter' icon='twitter' />
                </div>
              </div>
            </div>
          }
        </Transition.Group>
      </div>
    )
  }
}

export default withAuth(Home);