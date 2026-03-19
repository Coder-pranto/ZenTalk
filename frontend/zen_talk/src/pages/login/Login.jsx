import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mx-auto'>
      <div className='w-full max-w-md p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-lg border border-white/20'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login
          <span className='text-blue-500'> ChatApp</span>
        </h1>

        <form className='mt-4'>
          <div>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              className='input input-bordered w-full'
            />
          </div>

          <div className='mt-2'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='input input-bordered w-full'
            />
          </div>

          <Link
            to='/signup'
            className='text-sm hover:underline hover:text-blue-500 mt-3 inline-block'
          >
           {"Don't"} have any account?
          </Link>

          <button className='btn btn-primary w-full mt-3'>Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
