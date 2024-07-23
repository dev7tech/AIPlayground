const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const items = [
  { title: 'Item 1', description: 'Description for Item 1' },
  { title: 'Item 2', description: 'Description for Item 2' },
  { title: 'Item 3', description: 'Description for Item 3' },
  { title: 'Item 4', description: 'Description for Item 4' },
];
