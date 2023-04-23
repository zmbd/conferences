import React, { useState, useEffect } from 'react';
import ConferenceItem from '../ConferenceItem/ConferenceItem';
import { useAuth } from '../../context/AuthContext';
import AddConference from '../AddConference/AddConference';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import styles from './conferenceslist.module.scss';

const ConferenceList = () => {
  const { user } = useAuth();
  const [conferences, setConferences] = useState([]);
  const [editingConference, setEditingConference] = useState(null);
  const [showAddNewConferenceForm, setShowAddNewConferenceForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

    setTimeout(() => setIsLoading(false), 750);
  }, [showAddNewConferenceForm]);

  const editConference = (conference) => {
    setEditingConference(conference);
    setShowAddNewConferenceForm(true);
  };

  const deleteConference = async (id) => {
    try {
      const auth_token = localStorage.getItem('auth_token');

      if (auth_token) {
        const response = await axios.delete(`/api/conferences/${id}`, {
          headers: {
            'Authorization': `Bearer ${auth_token}`,
          },
        });

        if (response.status === 200) {
          setConferences(conferences.filter((conference) => conference.id !== id));
        }
      }
    } catch (error) {
      console.error('Error deleting conference:', error);
    }
  };

  const handleEditingConferenceReset = () => {
    setEditingConference(null);
  }

  const handleAddNewConferenceDisplay = () => {
    setShowAddNewConferenceForm(false);
  }

  if (!conferences || isLoading) return <>Loading...</>;

  return (
    <>
      <h2>Conferences</h2>
      {user && !showAddNewConferenceForm && <button onClick={() => setShowAddNewConferenceForm(true)}>Add new conference</button>}
      {showAddNewConferenceForm && (
        <AddConference handleAddNewConferenceDisplay={handleAddNewConferenceDisplay} conference={editingConference} handleEditingConferenceReset={handleEditingConferenceReset} />
      )}
      {!showAddNewConferenceForm && <div className={styles.conferencesContainer}>
        {conferences.map((conference) => (
          <ConferenceItem key={uuid()} item={conference} showDetails={user} editConference={editConference} deleteConference={deleteConference} />
        ))}
      </div>
      }
    </>
  );
};

export default ConferenceList;
