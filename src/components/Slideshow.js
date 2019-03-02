import React, { Component } from 'react';
import './Slideshow.scss';
import Card from './Card';
import placesService from '../lib/placesService';

class Slideshow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      places: [],
      place: {},
    }
  }

  componentDidMount() {
    placesService.getAllPlaces()
      .then((places) => {
        this.setState({
          places,
          place: places[0],
        });
      })
      .catch(error => console.log(error));
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

  render() {
    const { places, place } = this.state;
    return (
      <div className="slideshow">
        <div className="buttons">
          <button onClick={() => this.prevPlace()}
          disabled={place.index === 0}>
            Prev
          </button>
          <button onClick={() => this.nextPlace()}
          disabled={place.index === places.length - 1}
          >
            Next
          </button>   
        </div>
        <div className={`cards-slider active-slide-${place.index}`}>
          <div className="cards-slider-wrapper" style={{
            'transform': `translateX(-${place.index*(100/places.length)}%)`
          }}>
            {
              places.map((place) => <Card key={place._id} place={place} />)
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Slideshow;
