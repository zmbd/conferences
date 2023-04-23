import React, { useState } from 'react';
import { loginUser } from '../../services/auth';

import styles from './login.module.scss'
import { useAuth } from '../../context/AuthContext';

const Login= (props) => {
  const { onFormSubmit } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      const { data } = response;

      if (data.access_token) {
        localStorage.setItem('auth_token', data.access_token);

        const userResponse = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
        setUser(userResponse.data);
        onFormSubmit();
      }
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange(setEmail)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange(setPassword)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className={styles.buttonGroupWrapper}>
          <button type="submit">Login</button>
          <button onClick={onFormSubmit}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
