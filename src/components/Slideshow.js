import React, { Component } from 'react';
import './Slideshow.scss';
import Place from './Place';
import { Button, Icon } from 'semantic-ui-react';
import placesService from '../lib/placesService';
import bookingService from '../lib/bookingService';

class Slideshow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      places: [],
      place: {},
    }
  }

  componentDidMount() {
    if(this.props.hasAllPlaces) {
      placesService.getAllPlaces()
        .then((places) => {
          this.setState({
            places,
            place: places[0],
          });
        })
        .catch(error => console.log(error));
    } else {
        placesService.getPlacesById(bookingService.placesPicked)
          .then((places) => {
            this.setState({
              places,
              place: places[0],
            });
          })
          .catch(error => console.log(error));

    }
  }

  nextPlace = () => {
    const { places, place } = this.state;
    const newIndex = place.index + 1;
    this.setState({
      place: places[newIndex],
    });
  }

  prevPlace = () => {
    const { places, place } = this.state;
    const newIndex = place.index - 1;
    this.setState({
      place: places[newIndex],
    });
  }

  renderAllPlaces = (places) => {
    return places.map((place) => {
      return (
        <Place key={place._id} place={place} />
        );
    });
  }

  render() {
    const { places, place } = this.state;

    if(places.length > 0) {
      return (
        <div className="slideshow">
          <div className={`cards-slider active-slide-${place.index}`}>
            <div className="cards-slider-wrapper" style={{
              'transform': `translateX(-${place.index*(100/places.length)}%)`
            }}>
              {this.renderAllPlaces(places)}
            </div>
          </div>
          <div className="buttons">
            <Button icon onClick={() => this.prevPlace()} disabled={place.index === 0}>
              <Icon name='arrow left' />
            </Button>
            <Button icon onClick={() => this.nextPlace()} disabled={place.index === places.length - 1}>
              <Icon name='arrow right' />
            </Button> 
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Slideshow;
