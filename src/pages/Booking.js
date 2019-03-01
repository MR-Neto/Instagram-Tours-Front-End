import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import { withAuth } from '../components/AuthProvider';
import bookingService from '../lib/bookingService';
import tourService from '../lib/tourService';

class Booking extends Component {

  state = {
    date: bookingService.date,
    numberOfTickets: bookingService.numberOfTickets,
<<<<<<< HEAD
    placesPicked: bookingService.placesPicked,
    tours: [],
=======
    placesPicked: bookingService.placesPicked
>>>>>>> f5f0649c33798b3b23fad26a6b906f46c3f176b4
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
    return this.state.tours.map((tour) => {
      return (
          <List.Item>
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
          {this.renderAllTours()}
        </List>
      </div>
    )
  }
}

export default withAuth(Booking);
