import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import { withAuth } from '../routes/AuthProvider';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';
import Calendar from '../components/Calendar';

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

  updateStageHandler = () => {
    this.props.updateStage(this.state, 1);
  }

  renderAllTours() {
    return this.state.tours.map((tour, index) => {
      return (
          <List.Item key={`tour.date-${index}`}>
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
    tourService.getAllTours()
      .then((tours) => {
        this.setState({
          tours,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { date, numberOfTickets, placesPicked } = this.state;

    return (
      <div>
        <Navbar />
        <input type="date" name="date" value={date} onChange={this.handleChangeInput} />
        <Calendar tours={this.state.tours}/>
        <h2>Pick 5 locations</h2>
        <div>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
          <img src="http://lorempixel.com/400/200/city/" alt="places"></img>
        </div>
        <div>
          <label htmlFor="number-of-people">No of people</label>
          <input type="number" name="numberOfTickets" value={numberOfTickets} onChange={this.handleChangeInput} />
          <p>Price: {25 * numberOfTickets} €</p>
          <button onClick={this.updateStageHandler}>Confirm</button>
        </div>
        <List divided relaxed>
          {this.state.tours && this.renderAllTours()}
        </List>
      </div>
    )
  }
}

export default withAuth(Booking);
