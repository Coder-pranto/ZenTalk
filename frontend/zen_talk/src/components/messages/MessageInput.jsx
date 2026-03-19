import { BsSend } from 'react-icons/bs';

const MessageInput = () => {
  return (
    <form className='px-4 py-3 border-t border-white/10 bg-white/5 backdrop-blur-md'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Send a message...'
          className='input input-bordered w-full pr-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-300'
        />

        <button
          type='submit'
          className='absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition'
        >
          <BsSend className='text-white w-4 h-4' />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
