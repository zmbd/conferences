import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ConferenceList from '../ConferencesList/ConferencesList';
import Header from '../Header/Header';

import styles from './app.module.scss';
import Login from '../Login/Login';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function App() {
  const { user, setUser } = useAuth();

  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const auth_token = localStorage.getItem('auth_token');

        if (auth_token) {
          const config = {
            headers: { Authorization: `Bearer ${auth_token}`},
          };

          const response = await axios.get('http://127.0.0.1:8000/api/user', config);
          setUser(response.data);
        }
      } catch (err) {
        console.error('Error fetching user data: ', err);
      }
    }

    fetchUser();
  }, []);

  const handleBtnAction = () => {
    if (!user) {
      setShowLoginForm(true);
    }
    else {
      setShowLoginForm(false);
      localStorage.removeItem('auth_token');
      setUser(null);
    } 
  }

  const onFormSubmit = () => {
    setShowLoginForm(false);
  }

  return (
    <>
      {showLoginForm ? (
        <div className={styles.loginModal}>
          {showLoginForm && <Login onFormSubmit={onFormSubmit} />}
        </div>
      ) : (
        <div className={styles.app}>
          <Header user={user} handleBtnAction={handleBtnAction} />
          <div className={styles.wrapper}>
            <ConferenceList />
          </div>
        </div>
      )}
    </>    
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>,
   document.getElementById('app'));
}