import { useState } from 'react';
import useSendMessage from '../../hooks/useSendMessages';
import { BsSend } from 'react-icons/bs';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage('');
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='px-4 py-3 border-t border-white/10 bg-white/5 backdrop-blur-md'
    >
      <div className='relative'>
        <input
          type='text'
          placeholder='Send a message...'
          className='input input-bordered w-full pr-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-300'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type='submit'
          className='absolute right-2 top-1/2 -translate-y-1/2 
             p-2 w-9 h-9 flex items-center justify-center 
             rounded-full bg-blue-500 hover:bg-blue-600 transition'
        >
          {loading ? (
            <div className='loading loading-spinner '></div>
          ) : (
            <BsSend className='text-white' />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
