import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    if (!selectedConversation?._id) {
      toast.error('No conversation selected');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message },
      );
      const newMessage = data.data;

      setMessages([...messages, newMessage]);
    } catch (error) {
      const messageErr =
        error?.response?.data?.message ||
        error.message ||
        'Failed to send message';
      toast.error(messageErr);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
