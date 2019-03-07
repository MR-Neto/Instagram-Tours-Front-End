import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import bookingService from '../lib/bookingService';

class Place extends Component {

  state = {
    isSelected: false,
  }
 
  toggleSelection = () => {
    const { isSelected } = this.state;
    this.setState({
      isSelected: !isSelected,
    });
  }

  componentDidMount = () => {
    const { place } = this.props;
    const selected = bookingService.placesPicked.includes(place._id);
    this.setState({
      isSelected: selected,
    })
  }

  render() {  
    const { place, readOnly } = this.props;
    const { imagesURL, index } = place;
    const { isSelected } = this.state;
    return (
      <div className="slide-container">
        <div id={`slide-${index}`} className={`slide ${isSelected ? 'slide-selected': ''}`} onClick={() => {
          !readOnly && bookingService.togglePlacesPicked(place._id);
          !readOnly && this.toggleSelection();
          }}>
          <Image 
            id={`slide-${index}`} 
            className="slide" 
            src={imagesURL} 
            size='medium' 
            circular
          />
        </div>
        <p>{place.name}</p>
      </div>
    );
  }
  
}

export default Place;