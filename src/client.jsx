import React from 'react';
import ReactDOM from 'react-dom';

import HomeContext from './home-context';
import Home from './Home';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app');
  const initialData = window.__INITIAL_DATA__;

  ReactDOM.hydrate(
    <HomeContext.Provider value={initialData}>
      <Home />
    </HomeContext.Provider>,
    appRoot,
  );
});
