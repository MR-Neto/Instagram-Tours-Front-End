import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import { withAuth } from '../routes/AuthProvider';
import tourService from '../lib/tourService';

class OrderHistory extends Component {

  state = {
    tours: [],
  }

  renderBookedTours() {
    return this.state.tours.map((tour) => {
      return (
        <List.Item>
            <List.Icon name='camera retro' size='large' verticalAlign='middle' />
            <List.Content>
              <List.Header as='a'>{tour.date}</List.Header>
              <List.Description as='a'>{tour.price}</List.Description>
            </List.Content>
          </List.Item>
      );
    });
  }

  componentDidMount() {
    tourService.getBookedToursByUser(this.props.user._id)
      .then((tours) => {
        console.log(tours)
        this.setState({
          tours,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <h3>Booked Tours</h3>
        <List divided relaxed>
          {this.renderBookedTours()}
        </List>
      </div>
    )
  }
}

export default withAuth(OrderHistory);
