import React, { Component } from 'react';
import { Container, Card, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import dateFns from 'date-fns';
import tourService from '../lib/tourService';
import { withAuth } from '../components/AuthProvider';
import Loader from './Loader';


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
    return this.state.tours.map((tour) => {
      return (
         <Container key={tour._id}>
          <Card className='card-place'>
            <Image id='images-grid' src={tour.places[0].imagesURL[0]} />
            <Card.Content>
              <Card.Description >{dateFns.format(tour.date, 'D MMM YYYY')} for {tour.users[0].numberOfTickets} people</Card.Description>
            </Card.Content>
          </Card>
        </Container>
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
        return (
          <Loader />
        );
      case "empty":
        return (
          <div className="empty-profile">
            <p>You have not booked with us previously. Start now!</p>
            <Link to="/book">
              <Button primary>
                Book now
              </Button>
            </Link>
          </div>
        );
      case "error":
        return <div>error</div>
      default:
        return (
          <div>
            <h3>Booked Tours</h3>
            <div id='grid-tour'>
              {this.renderBookedTours()}
            </div>
          </div>
        )
    }
  }
}

export default withAuth(OrderHistory);
