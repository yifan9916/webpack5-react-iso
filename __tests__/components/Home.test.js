import React from 'react';
import { render } from '@testing-library/react';

import Home from '../../src/Home';

test('renders and matches snapshot', () => {
  const { container } = render(<Home />);

  expect(container).toMatchSnapshot();
});
