import React, { Component } from 'react';
import { Button, Message, Transition, Divider } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import { withAuth } from '../routes/AuthProvider';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import Calendar from '../components/Calendar';
import Slideshow from '../components/Slideshow';
import './Booking.scss';

class Booking extends Component {

  state = {
    date: bookingService.date,
    numberOfTickets: bookingService.numberOfTickets,
    placesPicked: bookingService.placesPicked,
    tours: [],
    capacity: 4,
    messageVisible: false,
    messageText: '',
    calendarVisibility: false,
    guestsVisibility: false,
  }

  updateSelectedDate = date => {
    this.setState({
      date,
    });
  }

  decreaseNumberOfTickets = () => {
    const { numberOfTickets, capacity } = this.state;
    if (numberOfTickets > 1) {
      this.setState({
        numberOfTickets: numberOfTickets - 1,
      });
    } else {
      this.setState({
        messageVisible: true,
        messageText: `Number of tickets must be min 1 and max ${capacity}`
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
        messageText: `Number of tickets must be min 1 and max ${capacity}`
      });
    }
  }

  handleDismiss = () => {
    this.setState({ messageVisible: false });
  }

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
      guestsVisibility: false,
    });
  }

  toggleVisibilityGuests = () => {
    const { guestsVisibility } = this.state;
    this.setState({
      calendarVisibility: false,
      guestsVisibility: !guestsVisibility,
    });
  }

  componentDidMount() {
    tourService.getAllTours()
      .then((tours) => {
        this.setState({
          tours,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { numberOfTickets,
            messageVisible, 
            messageText, 
            calendarVisibility,
            guestsVisibility,
          } = this.state;

    return (
      <div>
        <div className="topbar">
          <Navbar />
        </div>
        <div className="filters">
          <div>
            <Button basic onClick={this.toggleVisibilityCalendar}>Dates</Button>
            <Button basic onClick={this.toggleVisibilityGuests}>Guests</Button>
          </div>
          <Button positive onClick={this.updateStageHandler}>Confirm</Button>
        </div>
        <Divider fitted/>
        {calendarVisibility && <Calendar updateSelectedDateHandler={this.updateSelectedDate}/>}
        <div className="options">
            {guestsVisibility && 
            <div className="number-of-tickets">
              <Button circular icon='minus' onClick={this.decreaseNumberOfTickets} />
              <p>{numberOfTickets}</p>
              <Button circular icon='plus' onClick={this.increaseNumberOfTickets}/> 
            </div>}
          <Transition.Group animation='fade' duration={500}>
            {messageVisible && <Message negative onDismiss={this.handleDismiss} header={messageText} />}
          </Transition.Group>
        </div>
        <Slideshow hasAllPlaces={true}/> 
      </div>
    );
  }
}

export default withAuth(Booking);
