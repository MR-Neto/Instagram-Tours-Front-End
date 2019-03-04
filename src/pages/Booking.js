import React, { Component } from 'react';
import { Input, Button, Message, Transition } from 'semantic-ui-react'
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
  }

  handleChangeInput = (e) => {

    const { value } = e.target;
    const { numberOfTickets, capacity } = this.state;
    if (numberOfTickets >= 1 && numberOfTickets <= capacity) {
      this.setState({
        numberOfTickets: value,
      });
    } else {
      this.setState({
        messageVisible: true,
        messageText: `Number of tickets must be min 1 and max ${capacity}`
      });
    }
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
    this.props.updateStage(this.state, 1);
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
    const { numberOfTickets, messageVisible, messageText } = this.state;

    return (
      <div>
        <div className="topbar">
          <Navbar />
        </div>
        <Calendar updateSelectedDateHandler={this.updateSelectedDate} />
        <h2>Pick 5 locations</h2>
        <Slideshow hasAllPlaces={true} />
        <div>
          <div className="number-of-tickets">
            <div>
              <Button circular icon='minus' onClick={this.decreaseNumberOfTickets} />
              <Input placeholder='No of people' name="numberOfTickets" value={numberOfTickets} onChange={this.handleChangeInput} />
              <Button circular icon='plus' onClick={this.increaseNumberOfTickets} />
            </div>
            <p>Price: {25 * numberOfTickets} €</p>
          </div>

          <Transition.Group animation='fade' duration={500}>
            {messageVisible && <Message negative onDismiss={this.handleDismiss} header={messageText} />}
          </Transition.Group>

          <Button onClick={this.updateStageHandler}>Confirm</Button>
        </div>
      </div>
    )
  }
}

export default withAuth(Booking);
