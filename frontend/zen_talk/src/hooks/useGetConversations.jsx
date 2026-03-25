import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const { data: users } = await axios.get('/api/users');
        setConversations(users.data);
      } catch (error) {
        const message = error?.response?.data?.error || error.message ||'Failed to fetch conversations';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
