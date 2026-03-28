import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const { loading, login } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs.username, inputs.password);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen mx-auto'>
      <div className='w-full max-w-md p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-lg border border-white/20'>
        <h1 className='text-3xl font-semibold text-center text-white'>
          Login
          <span className='text-blue-500'> ZenTalk</span>
        </h1>

        <form className='mt-4' onSubmit={handleSubmit}>
          <div>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <input
              type='text'
              name='username'
              placeholder='Enter username'
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
              placeholder='Enter Password'
              className='input input-bordered w-full'
              value={inputs.password}
              onChange={handleChange}
            />
          </div>

          <Link
            to='/signup'
            className='text-sm hover:underline hover:text-blue-500 mt-3 inline-block'
          >
            {"Don't"} have any account?
          </Link>

          <button className='btn btn-primary w-full mt-3' disabled={loading}>
            {!loading ? (
              'Login'
            ) : (
              <span className='loading loading-spinner '></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
