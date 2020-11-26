import React from 'react';
import { render } from '@testing-library/react';

import { Component } from '../../src/Component';

test('renders and matches snapshot', () => {
  const { container } = render(<Component />);

  expect(container).toMatchSnapshot();
});
