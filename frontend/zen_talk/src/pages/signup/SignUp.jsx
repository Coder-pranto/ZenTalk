import { useState } from "react";
import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import useSignup from "../../hooks/useSignup";


const SignUp = () => {

  const { loading, signup } = useSignup();

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender:''
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }
   
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("input data", inputs);
     await signup(inputs);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen mx-auto'>
      <div className='w-full max-w-md p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-lg border border-white/20'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Sign Up
          <span className='text-blue-500'> ZenTalk</span>
        </h1>

        <form className='mt-4' onSubmit={handleSubmit}>
          <div>
            <label className='label'>
              <span className='label-text'>Full Name</span>
            </label>
            <input
              type='text'
              name='fullName'
              placeholder='John Doe'
              className='input input-bordered w-full'
              value={inputs.fullName}
              onChange={handleChange}
            />
          </div>

          <div className='mt-2'>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='johndoe'
              className='input input-bordered w-full'
              value={inputs.username}
              onChange={handleChange}
            />
          </div>

          <div className='mt-2'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              name='password'
              placeholder='Enter password'
              className='input input-bordered w-full'
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          <div className='mt-2'>
            <label className='label'>
              <span className='label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              className='input input-bordered w-full'
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <GenderCheckbox
            onChange={handleChange}
            selectedGender={inputs.gender}
          />

          <Link
            to='/login'
            className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block'
          >
            Already have an account?
          </Link>

          <button className='btn btn-primary w-full mt-4'>
            {loading ? (
              <span className='loading loading-spinner'></span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
