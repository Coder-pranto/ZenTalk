const Conversation = () => {
  return (
    <>
      <div className='flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-white/10'>
        <div className='avatar online'>
          <div className='w-12 rounded-full ring ring-white/20 ring-offset-2 ring-offset-transparent'>
            <img
              src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
              alt='user avatar'
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-white'>John Doe</p>
            <span className='text-sm text-gray-300'>🎃</span>
          </div>
        </div>
      </div>

      <div className='border-b border-white/10 my-1'></div>
    </>
  );
};

export default Conversation;
