import React from 'react';
import { render } from 'enzyme';

import Home from '../../src/Home';

describe('<Home />', () => {
  it('renders and matches snapshot', () => {
    const component = render(<Home />);

    expect(component).toMatchSnapshot();
  });
});
