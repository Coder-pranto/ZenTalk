import { useState } from 'react';
import {useAuthContext}  from '../context/useAuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    try {
      setLoading(true);

      await axios.post('/api/auth/logout');

      localStorage.removeItem('chat-user');
      setAuthUser(null);

      toast.success('Logged out successfully');
    } catch (error) {
      console.log('Logout error:', error);

      const message =
        error.response?.data?.message || error.message || 'Logout failed';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
