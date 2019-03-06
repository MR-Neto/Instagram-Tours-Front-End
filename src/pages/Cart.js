import React, { Component, Fragment } from 'react';
import { withAuth } from '../components/AuthProvider';
import { withRouter } from 'react-router-dom'
import Navbar from '../components/Navbar';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import placesService from '../lib/placesService';
import { injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';
import { CardElement } from 'react-stripe-elements';
import { Button, Message, Card, Image, Placeholder, Container } from 'semantic-ui-react'
import dateFns from 'date-fns';
import './Cart.css';

class Cart extends Component {

  state = {
    messageText: false,
    messageType: "",
    places: [],
    isloaded: false,
  }

  updateStageHandler = () => {
    this.props.updateStage(null, 0);
    bookingService.resetPlacesPicked();
  }

  validateBooking(responseMakeBooking) {
    if (responseMakeBooking.code === 'successful booking') {
      bookingService.clearValues();
      this.setState = {
        messageText: "Successful Booking!",
        messageType: 'positive',
      }
    } else if (responseMakeBooking === 'payment unsuccessful') {
      this.setState({
        messageText: "payment unsuccessful",
        messageType: 'negative',
      });
    } else if (responseMakeBooking === 'tour is full') {
      this.setState({
        messageText: "tour is full",
        messageType: 'negative',
      });
    }
  }

  handleDismiss = () => {
    this.setState({ messageText: false });
  };

  makeBookingHandler = async () => {
    const { isLogged, stripe } = this.props;

    try {
      if (isLogged) {
        const { date, numberOfTickets, placesPicked: places } = bookingService;
        const { name } = this.props.user;

        const data = await stripe.createToken({
          name
        });

        const token = data.token.id;

        const user = {
          buyer: this.props.user._id,
          numberOfTickets,
        }
        const responseMakeBooking = await tourService.makeBooking({
          details: { date, user, places },
          token,
        });
        this.validateBooking(responseMakeBooking);
      } else {
        this.props.history.push({
          pathname: '/auth',
          state: { from: this.props.location }
        });
      }
    } catch (error) {
      this.setState({
        messageText: "Booking unsuccessful",
        messageType: 'negative',
      });
    }
  }

  componentDidMount() {
    placesService.getPlacesById(bookingService.placesPicked)
      .then((places) => {
        this.setState({
          places,
          isloaded: true,
        });
      })
      .catch(error => console.log(error));
  }

  renderAllPlaces = () => {
    return this.state.places.map((place) => {
      return (
        <Container>
          <Card className='card-place'>
            <Image src={place.imagesURL[0]} />
            <Card.Content>
              <Card.Header>{place.name}</Card.Header>
            </Card.Content>
          </Card>
        </Container>
      );
    });
  }

  render() {
    const { date, numberOfTickets } = bookingService;
    const { messageText, messageType, isloaded } = this.state;

    return (
      <div>
        <div className='topbar'>
          <Navbar />
        </div>
        <div className='container-cart'>
          <Card id='summary-card'>
            <Card.Content header='Summary' />
            <Card.Content>
              <p>Date: {dateFns.format(date, 'D MMMM YYYY')}</p>
              <p>Persons: {numberOfTickets}</p>
              <p>Price: {numberOfTickets * 25}€</p>
              {this.props.isLogged && <CardElement style={{ base: { fontSize: '18px' } }} />}
              <Button basic onClick={this.updateStageHandler}>Back</Button>
              <Button positive onClick={this.makeBookingHandler}>Book</Button>
              {messageText &&
                <Message negative={messageType === 'negative'} positive={messageType === 'positive'} onDismiss={this.handleDismiss}>
                  <Message.Header>{messageText}</Message.Header>
                </Message>
              }
            </Card.Content>
          </Card>
          <h2>Your tour</h2>
          <div className='grid-tour'>
            {isloaded ?
              this.renderAllPlaces()
              :
              <Fragment>
                <Card>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                  <Card.Content>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                      </Placeholder.Header>
                    </Placeholder>
                  </Card.Content>
                </Card>
                <Card>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                  <Card.Content>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                      </Placeholder.Header>
                    </Placeholder>
                  </Card.Content>
                </Card>
                <Card>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                  <Card.Content>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                      </Placeholder.Header>
                    </Placeholder>
                  </Card.Content>
                </Card>
                <Card>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                  <Card.Content>
                    <Placeholder>
                      <Placeholder.Header>
                        <Placeholder.Line length='very short' />
                      </Placeholder.Header>
                    </Placeholder>
                  </Card.Content>
                </Card>
              </Fragment>
            }
          </div>

        </div>






        {/* <Slideshow hasAllPlaces={false} readOnly={true} /> */}
        {/* <Slideshow hasAllPlaces={false}/> */}


      </div >
    )
  }
}

export default compose(
  withAuth,
  withRouter,
  injectStripe
)(Cart);
