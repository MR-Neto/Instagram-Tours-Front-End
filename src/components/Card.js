import React from 'react';
import { Image } from 'semantic-ui-react';

const Card = ({place}) => {
  const { imagesURL, index } = place;

  return (
    <div id={`card-${index}`} className="card">
      <Image id={`card-${index}`} className="card" src={imagesURL} size='medium' circular />
    </div>
  );
}

export default Card;