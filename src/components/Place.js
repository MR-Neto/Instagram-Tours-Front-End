import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import bookingService from '../lib/Booking/bookingService';
import { connect } from 'react-redux'
import { togglePlace } from '../lib/Booking/actions'


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
    const { place, placesPicked } = this.props;
    const selected = placesPicked.includes(place._id);
    this.setState({
      isSelected: selected,
    })
  }

  render() {  
    const { place, readOnly, togglePlace } = this.props;
    const { imagesURL, index } = place;
    const { isSelected } = this.state;
    return (
      <div className="slide-container">
        <div id={`slide-${index}`} className={`slide ${isSelected ? 'slide-selected': ''}`} onClick={() => {
          !readOnly && togglePlace(place._id);
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

const mapStateToProps = (state) => {
  return {
    placesPicked: state.placesPicked
  }
}

const mapDispatchToProps = {
  togglePlace,
}

export default connect(mapStateToProps,mapDispatchToProps)(Place);