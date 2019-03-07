import React, { Component, Fragment } from 'react';
import { withAuth } from '../components/AuthProvider';
import { withRouter } from 'react-router-dom'
import Navbar from '../components/Navbar';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import placesService from '../lib/placesService';
import { injectStripe } from 'react-stripe-elements';
import { compose } from 'recompose';
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import { Button, Message, Card, Grid, Image, Placeholder, Container } from 'semantic-ui-react'
import dateFns from 'date-fns';
import './Cart.css';

class Cart extends Component {

  state = {
    messageText: false,
    messageType: false,
    places: [],
    isloaded: false,
    isPaying: false,
  }

  updateStageHandler = () => {
    this.props.updateStage(null, 0);
    bookingService.resetPlacesPicked();
  }

  validateBooking = (responseMakeBooking) => {
    console.log("inside validate booking, responseMakeBooking:", responseMakeBooking);
    if (responseMakeBooking.code === 'successful booking') {
      this.setState({
        messageText: "Successful Booking!",
        messageType: true,
        isPaying: false,
      });

    } else if (responseMakeBooking.code === 'payment unsuccessful') {
      this.setState({
        messageText: "Payment unsuccessful.",
        messageType: false,
        isPaying: false,
      });
    } else if (responseMakeBooking.code === 'tour is full') {
      this.setState({
        messageText: "Tour is full.",
        messageType: false,
        isPaying: false,
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
        this.setState({
          isPaying: true,
        });

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
        console.log(responseMakeBooking)
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
        messageType: false,
        isPaying: false,
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
        <Container key={place._id}>
          <Card className='card-place'>
            <Image id='images-grid' src={place.imagesURL[0]} />
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
    const { messageText, messageType, isloaded, isPaying } = this.state;

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
              {this.props.isLogged &&
                <Fragment>
                  <CardElement className='StripeElement' style={{
                    base: {
                      iconColor: '#666EE8',
                      color: 'black',
                      lineHeight: '40px',
                      fontWeight: 300,
                      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                      fontSize: '15px',

                      '::placeholder': {
                        color: '#CFD7E0',
                      }
                    }
                  }} />
          
                  {/* <CardNumberElement />
                  <div>
                    <CardExpiryElement />
                    <CardCVCElement />
                  </div> */}

                </Fragment>

              }
              <div className='container-buttons'>
                <Button basic onClick={this.updateStageHandler}>Back</Button>
                <Button id='button-pay' loading={isPaying} onClick={this.makeBookingHandler}>Book</Button>
              </div>
              {messageText &&
                <Message negative={!messageType} positive={messageType} onDismiss={this.handleDismiss}>
                  <Message.Header>{messageText}</Message.Header>
                </Message>
              }
            </Card.Content>
          </Card>
          <h2>Your tour</h2>
          <div id='grid-tour'>
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
