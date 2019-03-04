import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { withAuth } from '../routes/AuthProvider';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import Calendar from '../components/Calendar';
import Slideshow from '../components/Slideshow';

class Booking extends Component {

  state = {
    date: bookingService.date,
    numberOfTickets: bookingService.numberOfTickets,
    placesPicked: bookingService.placesPicked,
    tours: [],
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  updateSelectedDate = date => {
    this.setState({
      date,
    });
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
    const { numberOfTickets } = this.state;

    return (
      <div>
        <Navbar />
        <Calendar updateSelectedDateHandler={this.updateSelectedDate}/>
        <h2>Pick 5 locations</h2>
        <Slideshow hasAllPlaces={true}/>
        <div>
          <label htmlFor="number-of-people">No of people</label>
          <input type="number" name="numberOfTickets" value={numberOfTickets} onChange={this.handleChangeInput} />
          <p>Price: {25 * numberOfTickets} €</p>
          <button onClick={this.updateStageHandler}>Confirm</button>
        </div>
      </div>
    )
  }
}

export default withAuth(Booking);
