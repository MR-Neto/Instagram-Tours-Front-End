import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import tourService from '../lib/tourService';
import { withAuth } from '../routes/AuthProvider';

const STATUS = {
  LOADING: 'loading',
  ERROR: 'error',
  EMPTY: 'empty',
  LOADED: 'laoded'
}


class OrderHistory extends Component {

  state = {
    tours: [],
    status: STATUS.LOADING
  }

  renderBookedTours() {
    console.log(this.state.tours)
    return this.state.tours.map((tour) => {
      return (
        <List.Item key={tour._id}>
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
        if (tours.length > 0) {
          this.setState({
            tours,
            status: STATUS.LOADED
          });
        } else {
          this.setState({
            tours: [],
            status: STATUS.EMPTY
          });
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          tours: [],
          // error: error.message; //check!!!!!
          status: STATUS.ERROR
        });
      });
  }

  render() {
    const { status } = this.state;
    switch (status) {
      case "loading":
        return <div>Loading...</div>
      case "empty":
        return <div>Empty...</div>
      case "error":
        return <div>error</div>
      default:
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
}

export default withAuth(OrderHistory);
