import React from 'react';
import ReactDOM from 'react-dom';

import { Component } from './Component';

document.addEventListener('DOMContentLoaded', () => {
  const appRoot = document.getElementById('app');

  ReactDOM.hydrate(<Component />, appRoot);
});
