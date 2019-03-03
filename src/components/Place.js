import React from 'react';
import { Image } from 'semantic-ui-react';
import bookingService from '../lib/bookingService';

const Place = ({place}) => {
  const { imagesURL, index } = place;
  return (
    <div id={`card-${index}`} className="card" onClick={() => bookingService.togglePlacesPicked(place._id)}>
      <Image id={`card-${index}`} className="card" src={imagesURL} size='medium' circular />
    </div>
  );
}

export default Place;