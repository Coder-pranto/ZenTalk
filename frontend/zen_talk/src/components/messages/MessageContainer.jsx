import { useEffect } from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import useConversation from '../../zustand/useConversation';
import {useAuthContext} from '../../context/useAuthContext';
import { TiMessages } from 'react-icons/ti';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);


  return (
    <div className='w-90 flex flex-col flex-1 h-full'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md'>
            <span className='text-gray-300 text-sm'>To:</span>{' '}
            <span className='text-white font-semibold'>{selectedConversation.fullName}</span>
          </div>

          <Messages />

          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  const currentUserName = authUser ? authUser?.fullName : 'Guest';
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='text-center text-white flex flex-col items-center gap-3 opacity-80'>
        <p className='text-lg md:text-xl font-semibold'>
          Welcome 👋 {currentUserName} ❄
        </p>
        <p className='text-sm text-gray-300'>
          Select a chat to start messaging
        </p>
        <TiMessages className='text-4xl md:text-6xl text-blue-400' />
      </div>
    </div>
  );
};
