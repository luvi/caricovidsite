import React from 'react';
import { render } from '@testing-library/react';
import Map from './App';

test('total cases does render', () => {
  const { map } = render(<Map />);
  
  expect(map.this.state.total).toBe(0)
});
