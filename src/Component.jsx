import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { useAppContext } from './app-context';

import './index.scss';
import styles from './component.module.scss';

const Component = () => {
  const appContext = useAppContext();

  return (
    <>
      <Helmet>
        <title>React App</title>
      </Helmet>
      <div className={styles.component}>
        <h1>{appContext.title}</h1>
        <Section />
      </div>
    </>
  );
};

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
