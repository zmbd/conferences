import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ConferenceList from '../ConferencesList/ConferencesList';
import Header from '../Header/Header';

import styles from './app.module.scss';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div className={styles.app}>
      <Header userId={user} />
      <div className={styles.wrapper}>
        <ConferenceList />
      </div>
    </div>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}