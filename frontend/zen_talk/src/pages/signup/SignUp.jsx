import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';

const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mx-auto'>
      <div className='w-full max-w-md p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-lg border border-white/20'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Sign Up
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form className='mt-4'>
          <div>
            <label className='label'>
              <span className='label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='John Doe'
              className='input input-bordered w-full'
            />
          </div>

          <div className='mt-2'>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='johndoe'
              className='input input-bordered w-full'
            />
          </div>

          <div className='mt-2'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              className='input input-bordered w-full'
            />
          </div>

          <div className='mt-2'>
            <label className='label'>
              <span className='label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm password'
              className='input input-bordered w-full'
            />
          </div>

          <GenderCheckbox />

          <Link to='/login'
            className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block' 
          >
            Already have an account?
          </Link>

          <button className='btn btn-primary w-full mt-4'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
