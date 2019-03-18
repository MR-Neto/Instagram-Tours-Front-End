import React, { Fragment } from 'react';
import { Grid, Segment, Placeholder, Container } from 'semantic-ui-react';

const Loader = (props) => {
  const { numberPlaceHolders } = props
  const array = [];
  for (let index = 0; index < numberPlaceHolders; index++) {
    array.push(index);
  }

  return (
    < Fragment >
      {
        array.map(() => {
          return (
            < Container >
              <Segment raised>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='medium' />
                    <Placeholder.Line length='short' />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Container >

          )
        })
      }
    </ Fragment>
  );
}

export default Loader;
