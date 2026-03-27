import { useState } from 'react';
import toast from 'react-hot-toast';

import axios from 'axios';
import { useAuthContext } from '../context/useAuthContext';

const validateInputs = (username, password) => {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const isValid = validateInputs(username, password);
    if (!isValid) return;

    setLoading(true);
    try {
      const { data: userData } = await axios.post('/api/auth/login', {
        username,
        password,
      });
        
      localStorage.setItem('chat-user', JSON.stringify(userData));
      setAuthUser(userData);

      toast.success('Login successful ✅');
    } catch (error) {
      // axios error handling
      const messageErr = error?.response?.data?.message || error.message || 'Login failed';
      toast.error(messageErr);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;


