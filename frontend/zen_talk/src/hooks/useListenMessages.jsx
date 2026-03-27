import { useEffect } from 'react';

import { useSocketContext } from '../context/useSocketContext';
import useConversation from '../zustand/useConversation';

import notificationSound from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socketInstance } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const currentSocket = socketInstance.current;
    
    currentSocket.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
        setMessages([...messages, newMessage]);
    });

    return () => currentSocket.off('newMessage');
  }, [socketInstance, setMessages, messages]);
};
export default useListenMessages;
