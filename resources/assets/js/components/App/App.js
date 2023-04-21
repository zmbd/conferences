import React from 'react';
import ReactDOM from 'react-dom';
import ConferenceList from '../ConferencesList';

import styles from './app.module.scss';

export default function App() {
  return (
    <div className={styles.app}>
      <ConferenceList />
    </div>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}