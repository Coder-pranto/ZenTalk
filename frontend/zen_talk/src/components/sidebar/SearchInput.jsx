import { IoSearchSharp } from 'react-icons/io5';

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search...'
        className='input input-bordered w-full rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-300'
      />
      <button
        type='submit'
        className='btn btn-circle bg-blue-500 hover:bg-blue-600 border-none text-white'
      >
        <IoSearchSharp className='w-5 h-5' />
      </button>
    </form>
  );
};

export default SearchInput;
