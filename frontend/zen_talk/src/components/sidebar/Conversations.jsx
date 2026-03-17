import Conversation from './Conversation';

const Conversations = () => {
  return (
    <div className='flex flex-col gap-1 overflow-y-auto flex-1 pr-1'>
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </div>
  );
};

export default Conversations;
