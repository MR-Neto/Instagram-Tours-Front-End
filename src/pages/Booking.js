import React, { Component } from 'react';
import { Button, Message, Transition, Divider, Popup, Card, Container, Icon, Image } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import Calendar from '../components/Calendar';
import Slideshow from '../components/Slideshow';
import dateFns from 'date-fns';
import './Booking.scss';

class Booking extends Component {
  state = {
    date: bookingService.date,
    numberOfTickets: bookingService.numberOfTickets,
    placesPicked: bookingService.placesPicked,
    tours: [],
    capacity: 4,
    messageVisible: false,
    messageText: "",
    calendarVisibility: false,
  }

  updateSelectedDate = date => {
    this.setState({
      date
    });
  };

  decreaseNumberOfTickets = () => {
    const { numberOfTickets } = this.state;
    if (numberOfTickets > 1) {
      this.setState({
        numberOfTickets: numberOfTickets - 1,
      });
    }
  }

  increaseNumberOfTickets = () => {
    const { numberOfTickets, capacity } = this.state;
    if (numberOfTickets < capacity) {
      this.setState({
        numberOfTickets: numberOfTickets + 1,
      });
    } else {
      this.setState({
        messageVisible: true,
        messageText: `Max ${capacity} persons per tour`,
      });
    }
  }

  handleDismiss = () => {
    this.setState({ messageVisible: false });
  };

  updateStageHandler = () => {
    const { date, placesPicked, numberOfTickets } = this.state;
    this.props.updateStage({
      date,
      placesPicked,
      numberOfTickets,
    }, 1);
  }

  toggleVisibilityCalendar = () => {
    const { calendarVisibility } = this.state;
    this.setState({
      calendarVisibility: !calendarVisibility,
      guestsVisibility: false
    });
  };

  showGuests = () => {
    this.setState({
      calendarVisibility: false,
    });
  }

  hideGuests = () => {
    this.setState({
      calendarVisibility: false,
    });
  };

  componentDidMount() {
    tourService
      .getAllTours()
      .then(tours => {
        this.setState({
          tours
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      date,
      numberOfTickets,
      placesPicked,
      messageVisible,
      messageText,
      calendarVisibility,
    } = this.state;
    
    let formattedDate;
    if (date) {
      formattedDate = dateFns.format(date, 'D MMM');
    } else {
      formattedDate = "Dates";
    }

    console.log("booking STAGE", bookingService.stage);

    return (
      <div>
        <div className="topbar">
          <Navbar />
        </div>
        <div className="filters">
          <div>
            <Button basic onClick={this.toggleVisibilityCalendar}>
              {formattedDate}
            </Button>
            <Popup
              trigger={<Button basic>{`Persons: ${numberOfTickets}`}</Button>}
              on='click'
              size='small'
              position='bottom center'
              onClose={this.hideGuests}
              onOpen={this.showGuests}
            >
              <div className="number-of-tickets">
                <Button basic circular icon='minus' onClick={this.decreaseNumberOfTickets} />
                <p>{numberOfTickets}</p>
                <Button basic circular icon='plus' onClick={this.increaseNumberOfTickets} />
              </div>
              <Transition.Group animation='fade' duration={500}>
                {messageVisible && <Message size='tiny' negative onDismiss={this.handleDismiss} header={messageText} />}
              </Transition.Group>
            </Popup>
          </div>
          <Button disabled={date === '' || placesPicked.length === 0} onClick={this.updateStageHandler}>
            Confirm
          </Button>
        </div>
        <Divider fitted />
        {calendarVisibility && (
          <Calendar updateSelectedDateHandler={this.updateSelectedDate} />
        )}
        <h2>Pick your places</h2>
        <Slideshow hasAllPlaces={true} readOnly={false} />
        <Container>
          <Card>
            <Image src="https://images.unsplash.com/photo-1531948371443-d5afa127f918?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
            <Card.Content>
              <Card.Header>We know the best places in Barcelona.</Card.Header>
              <Card.Description>
                Barcelona is a city of many facets. If you want to ensure to get
                the best shots, book with us.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="camera retro" />
              29 people have visited this place.
            </Card.Content>
          </Card>
          <Card>
            <Image src="https://images.unsplash.com/photo-1518461620302-c693c2cce0e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80" />
            <Card.Content>
              <Card.Header>Tell us how you would like your tour.</Card.Header>
              <Card.Description>
                You tour, the way you want it. You can make it private.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="camera retro" />
              52 people have visited this place.
            </Card.Content>
          </Card>
          <Button fluid disabled={date === '' || placesPicked.length === 0} onClick={this.updateStageHandler}>Confirm</Button>
        </Container>
      </div>
    );
  }
}

export default withAuth(Booking);
