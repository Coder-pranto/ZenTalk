const Message = ({ own = false }) => {
  return (
    <div className={`chat ${own ? 'chat-end' : 'chat-start'}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full ring ring-white/20'>
          <img
            src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
            alt='avatar'
          />
        </div>
      </div>

      <div
        className={`chat-bubble text-white ${
          own ? 'bg-blue-500/80' : 'bg-white/10 backdrop-blur-md'
        }`}
      >
        Hi! What is up?
      </div>

      <div className='chat-footer text-xs text-gray-400'>12:42</div>
    </div>
  );
};

export default Message;



