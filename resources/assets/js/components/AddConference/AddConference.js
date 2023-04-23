import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './addconference.module.scss';

const AddConference = (props) => {
  const { handleAddNewConferenceDisplay, conference, handleEditingConferenceReset } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (conference) {
      setTitle(conference.title);
      setDescription(conference.description);
    }
  }, [conference]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth_token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${auth_token}` };

      if (conference) {
        await axios.put(`/api/conferences/${conference.id}`, {
          title,
          description,
        }, {
          headers,
        });

        handleEditingConferenceReset();
      } else {
        await axios.post('/api/conferences', {
          title,
          description,
        }, {
          headers,
        });
      }

      handleAddNewConferenceDisplay();
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Error adding conference.');
    }
  };

  return (
    <div className={styles.addConferenceForm}>
      <h2>{conference ? 'Edit Conference' : 'Add Conference'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button className={styles.submitButton} type="submit">{conference ? 'Submit changes' : 'Add conference'}</button>
      </form>
    </div>
  );
};

export default AddConference;
