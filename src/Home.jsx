import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { useHomeContext } from './home-context';

import './index.scss';
import styles from './Home.module.scss';

const Home = () => {
  const appContext = useHomeContext();

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={styles.home}>
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

export default Home;
