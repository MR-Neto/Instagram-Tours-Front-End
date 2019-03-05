import React, { Component } from 'react';
import { Button, Message, Transition, Divider, Popup } from 'semantic-ui-react';
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
    messageText: '',
    calendarVisibility: false,
    popUpOpened: false,
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
        popUpOpened: true,
      });
    }
  }

  increaseNumberOfTickets = () => {
    const { numberOfTickets, capacity } = this.state;
    if (numberOfTickets < capacity) {
      this.setState({
        numberOfTickets: numberOfTickets + 1,
        popUpOpened: true,
      });
    } else {
      this.setState({
        messageVisible: true,
        messageText: `Max ${capacity} persons per tour`,
        popUpOpened: true,
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

  showGuests = () => {
    this.setState({
      calendarVisibility: false,
      popUpOpened: true,
    });
  }

  hideGuests = () => {
    this.setState({
      calendarVisibility: false,
      popUpOpened: false,
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
    const { date,
      numberOfTickets,
      messageVisible,
      messageText,
      calendarVisibility,
      popUpOpened,
    } = this.state;
    let formattedDate;
    if (date) {
      formattedDate = dateFns.format(date, 'D MMM');
    } else {
      formattedDate = 'Dates';
    }

    return (
      <div>
        <div className="topbar">
          <Navbar />
        </div>
        <div className="filters">
          <div>
            <Button basic onClick={this.toggleVisibilityCalendar}>{formattedDate}</Button>
            <Popup
              trigger={<Button basic>{(numberOfTickets !== bookingService.numberOfTickets) ? `Persons: ${numberOfTickets}` : 'Persons'}</Button>}
              on='click'
              size='small'
              position='bottom center'
              onClose={this.hideGuests}
              onOpen={this.showGuests}
            >
              <div className="number-of-tickets">
                <Button circular icon='minus' onClick={this.decreaseNumberOfTickets} />
                <p>{numberOfTickets}</p>
                <Button circular icon='plus' onClick={this.increaseNumberOfTickets} />
              </div>
              <Transition.Group animation='fade' duration={500}>
                {messageVisible && <Message size='tiny' negative onDismiss={this.handleDismiss} header={messageText} />}
              </Transition.Group>
            </Popup>
          </div>
          <Button positive onClick={this.updateStageHandler}>Confirm</Button>
        </div>
        <Divider fitted />
        {calendarVisibility && <Calendar updateSelectedDateHandler={this.updateSelectedDate} />}
        <Slideshow hasAllPlaces={true} readOnly={false} />
      </div>
    );
  }
}

export default withAuth(Booking);
