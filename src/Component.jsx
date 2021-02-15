import React, { useState } from 'react';
import Helmet from 'react-helmet';

import './index.scss';
import styles from './component.module.scss';

const Component = () => (
  <>
    <Helmet>
      <title>React App</title>
    </Helmet>
    <div className={styles.component}>
      <h1>Component</h1>
      <Section />
    </div>
  </>
);

const Section = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div className={styles.section}>
      <p>This is a counter: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export { Component };
