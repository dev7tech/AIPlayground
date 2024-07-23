import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, Text } from '@nextui-org/react';

const ResponsiveCarousel = ({ responsive, items }) => {
  return (
    <Carousel responsive={responsive}>
      {items.map((item, index) => (
        <Card key={index} css={{ mw: '400px' }}>
          <Card.Header>
            <Text b>{item.title}</Text>
          </Card.Header>
          <Card.Body>
            <Text>{item.description}</Text>
          </Card.Body>
        </Card>
      ))}
    </Carousel>
  );
};

export default ResponsiveCarousel;
