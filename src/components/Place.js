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

  render() {  
    const { place, readOnly } = this.props;
    const { imagesURL, index } = place;
    const { isSelected } = this.state;
    return (
      <div id={`card-${index}`} className={`card ${isSelected ? 'card-selected': ''}`} onClick={() => {
        !readOnly && bookingService.togglePlacesPicked(place._id);
        !readOnly && this.toggleSelection();
        }}>
        <Image 
          id={`card-${index}`} 
          className="card" 
          src={imagesURL} 
          size='medium' 
          circular
        />
      </div>
    );
  }
  
}

export default Place;