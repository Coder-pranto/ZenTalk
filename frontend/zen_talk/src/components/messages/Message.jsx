import { useAuthContext } from '../../context/useAuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  // const { data: user } = useAuthContext().authUser;
  const { authUser: { data: user } = {} } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message?.senderId === user._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe
    ? user.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'chat-bubble-info' : 'chat-bubble-accent';
  // const bubbleBgColor = fromMe ? "bg-blue-400" : "bg-gray-300";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full ring ring-white/20'>
          <img src={profilePic} alt='avatar' />
        </div>
      </div>

      <div className={`chat-bubble ${bubbleBgColor} wrap-break-word pb-2`}>
        {message.message}
        
      </div>

      <div className='chat-footer text-xs text-gray-400'>{formattedTime}</div>
    </div>
  );
};

export default Message;
