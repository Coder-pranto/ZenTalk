import { useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 1) {
      setFiltered([]);
      return;
    }

    const matches = conversations.filter((c) =>
      c.fullName.toLowerCase().includes(value.toLowerCase()),
    );

    setFiltered(matches);
  };

  const handleSelect = (conversation) => {
    setSelectedConversation(conversation);
    setSearch('');
    setFiltered([]);
  };

  return (
    <div className='relative w-full'>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search...'
          className='input input-bordered w-full rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-300'
          value={search}
          onChange={handleChange}
        />
        <IoSearchSharp className='absolute right-4 text-white w-5 h-5' />
      </div>

      {search && (
        <div className='absolute top-full left-0 right-0 mt-2 z-50'>
          {filtered.length > 0 ? (
            <ul className='bg-white/80 backdrop-blur-md rounded-xl max-h-60 overflow-y-auto shadow-xl border border-white/20'>
              {filtered.map((c) => (
                <li
                  key={c._id}
                  className='flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:text-white'
                  onClick={() => handleSelect(c)}
                >
                  <img
                    src={c.profilePic}
                    alt={c.fullName}
                    className='w-9 h-9 rounded-full object-cover border-2 border-blue-500'
                  />
                  <span className='text-gray-800 group-hover:text-white'>
                    {c.fullName}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className='bg-white/80 backdrop-blur-md p-4 text-center text-gray-600 rounded-xl shadow-lg border border-white/20'>
                🔍 No users found
                <p className='text-[8px] text-red-400 capitalize'>❌ remove input</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;




//* NOTE: Without suggestion based.

// import { useState } from 'react';
// import { IoSearchSharp } from 'react-icons/io5';
// import useConversation from '../../zustand/useConversation';
// import useGetConversations from '../../hooks/useGetConversations';
// import toast from 'react-hot-toast';

// const SearchInput = () => {
//   const [search, setSearch] = useState('');
//   const { setSelectedConversation } = useConversation();
//   const { conversations } = useGetConversations();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!search) return;
//     if (search.length < 3) {
//       return toast.error('Search term must be at least 3 characters long');
//     }

//     const conversation = conversations.find((c) =>
//       c.fullName.toLowerCase().includes(search.toLowerCase()),
//     );

//     if (conversation) {
//       setSelectedConversation(conversation);
//       setSearch('');
//     } else toast.error('No such user found!');
//   };

//   return (
//     <form onSubmit={handleSubmit} className='flex items-center gap-2'>
//       <input
//         type='text'
//         placeholder='Search...'
//         className='input input-bordered w-full rounded-full bg-white/10 border-white/20 text-white placeholder:text-gray-300'
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <button
//         type='submit'
//         className='btn btn-circle bg-blue-500 hover:bg-blue-600 border-none text-white'
//       >
//         <IoSearchSharp className='w-5 h-5' />
//       </button>
//     </form>
//   );
// };

// export default SearchInput;
