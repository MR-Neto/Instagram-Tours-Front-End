import React, { Component } from 'react';
import { Container, Image } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import OrderHistory from '../components/OrderHistory';
import { withAuth } from '../components/AuthProvider';
import './Profile.scss';

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <Container>
        <div className="topbar">
          <Navbar />
        </div>
        <Container>
          <div className="profile-details" id="profile-details">
            {user.imageURL ?
            <Image src={user.imageURL} rounded /> :
            <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' rounded />
            }
            <h2>{user.name}</h2>
          </div>
        </Container>
        <OrderHistory />
      </Container>
    )
  }
}

export default withAuth(Profile);