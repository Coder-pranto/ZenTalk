import { useEffect, useRef } from 'react';
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeleton/messageSkeleton';
import Message from './Message';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);
  
  return (
    <div className='flex-1 overflow-y-auto px-4 py-3 space-y-2'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message,idx) => (
          <div
            key={message._id}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
