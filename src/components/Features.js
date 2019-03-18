import React from 'react'
import { Card, Container, Icon, Image } from 'semantic-ui-react';


export default function Features(props) {
  return (
    <Container>
      <Card>
        <Image src="https://images.unsplash.com/photo-1531948371443-d5afa127f918?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" />
        <Card.Content>
          <Card.Header>We know the best places in Barcelona.</Card.Header>
          <Card.Description>
            Barcelona is a city of many facets. If you want to ensure to get
            the best shots, book with us.
              </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="camera retro" />
          29 people have visited this place.
            </Card.Content>
      </Card>
      <Card>
        <Image src="https://images.unsplash.com/photo-1518461620302-c693c2cce0e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80" />
        <Card.Content>
          <Card.Header>Tell us how you would like your tour.</Card.Header>
          <Card.Description>
            You tour, the way you want it. You can make it private.
              </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="camera retro" />
          52 people have visited this place.
            </Card.Content>
      </Card>
      {props.children}
    </Container>
  )
}
