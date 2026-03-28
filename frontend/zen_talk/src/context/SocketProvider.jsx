import { useEffect, useRef, useState } from 'react';
import { SocketContext } from './SocketContext';
import { useAuthContext } from './useAuthContext';
import io from 'socket.io-client';

export const SocketContextProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { authUser } = useAuthContext();


  useEffect(() => {
    if (!authUser) return;

    socketRef.current = io('https://zentalk-3xh6.onrender.com', {
      query: {
        userId: authUser._id,
      },
      transports: ['websocket'],
    });

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socketRef.current.on('getOnlineUsers', handleOnlineUsers);

    return () => {
      if (socketRef.current) {
        socketRef.current.off('getOnlineUsers', handleOnlineUsers);
        socketRef.current.close();
      }
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socketInstance: socketRef, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
