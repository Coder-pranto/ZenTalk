import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import SearchInput from './SearchInput';

const Sidebar = () => {
  return (
      <div className='w-80 border-r border-white/10 p-4 flex flex-col bg-white/5 backdrop-blur-md'>
          
      <SearchInput />

      <div className='divider divider-neutral my-4'></div>

      <Conversations />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
