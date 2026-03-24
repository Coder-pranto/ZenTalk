import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className='mt-auto pt-4 flex justify-start'>
      <button
        className='p-2 rounded-full hover:bg-white/10 transition'
        onClick={logout}
      >
        {!loading ? (
          <BiLogOut className='w-6 h-6 text-white cursor-pointer' />
        ) : (
          <span className='loading loading-spinner'></span>
        )}
      </button>
    </div>
  );
};

export default LogoutButton;
