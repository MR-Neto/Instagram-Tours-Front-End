import React, { Component } from 'react';
import { Button, Message, Transition, Divider, Popup } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';
import bookingService from '../lib/Booking/bookingService';
import tourService from '../lib/tourService';
import Calendar from '../components/Calendar';
import Slideshow from '../components/Slideshow';
import dateFns from 'date-fns';
import './Booking.scss';
import Features from '../components/Features';

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
    guestsVisibility: false,
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

  toggleVisibilityGuests = () => {
    const { guestsVisibility } = this.state;
    this.setState({
      guestsVisibility: !guestsVisibility,
      calendarVisibility: false
    });
  }

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
              onClose={this.toggleVisibilityGuests}
              onOpen={this.toggleVisibilityGuests}
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
        <Features >
          <Button fluid disabled={date === '' || placesPicked.length === 0} onClick={this.updateStageHandler}>Confirm</Button>
        </Features >
      </div>
    );
  }
}

export default withAuth(Booking);
