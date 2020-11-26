import React from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from './app-context';
import { Component } from './Component';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app');
  const initialData = window.__INITIAL_DATA__;

  ReactDOM.hydrate(
    <AppContext.Provider value={initialData}>
      <Component />
    </AppContext.Provider>,
    appRoot,
  );
});
