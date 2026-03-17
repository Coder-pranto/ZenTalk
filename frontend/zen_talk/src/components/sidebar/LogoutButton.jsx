import { BiLogOut } from 'react-icons/bi';

const LogoutButton = () => {
  const handleLogout = () => {
    console.log('Logout clicked!');
   
  };

  return (
    <div className='mt-auto pt-4 flex justify-start'>
      <button
        onClick={handleLogout}
        className='p-2 rounded-full hover:bg-white/10 transition'
      >
        <BiLogOut className='w-6 h-6 text-white' />
      </button>
    </div>
  );
};

export default LogoutButton;
