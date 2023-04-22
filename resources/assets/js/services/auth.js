import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password,
    });

    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
  } catch (error) {
    console.error('Login error:', error.response.data.message);
  }
};

export const getProtectedData = async () => {
  const access_token = localStorage.getItem('access_token');
  if (!access_token) {
    console.error('No access token found.');
    return;
  }

  try {
    const response = await axios.get('http://127.0.0.1:8000/api/protected', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log('Protected data:', response.data);
  } catch (error) {
    console.error('Error fetching protected data:', error.response.data.message);
  }
};

export const isUserAuthorized = () => {
  return !!localStorage.getItem('access_token');
};