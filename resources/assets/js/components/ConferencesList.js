import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConferenceList = () => {
  const [conferences, setConferences] = useState([]);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get('/api/conferences');
        console.log(response.data.data)
        setConferences(response.data.data);
      } catch (error) {
        console.error('Error fetching conferences:', error);
      }
    };

    fetchConferences();
  }, []);

  if (!conferences) return <>Loading...</>;

  return (
    <div>
      <h2>Conferences</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {conferences.map((conference) => (
            <tr key={conference.id}>
              <td>{conference.name}</td>
              <td>{conference.description}</td>
              <td>{conference.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConferenceList;
