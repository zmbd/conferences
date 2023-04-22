import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './conferenceslist.module.scss';
import ConferenceItem from '../ConferenceItem/ConferenceItem';

const ConferenceList = () => {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get('/api/conferences');
        setConferences(response.data.data);
      } catch (error) {
        console.error('Error fetching conferences:', error);
      }
    };

    fetchConferences();
  }, []);

  if (!conferences) return <>Loading...</>;

  return (
    <>
      <h2>Conferences</h2>
      <div className={styles.conferencesContainer}>
        {conferences.map((conference) => (
          <ConferenceItem key={conference} item={conference} />
        ))}
      </div>
    </>
  );
};

export default ConferenceList;
