import { useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/useAuthContext";


const validateInputs = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
};

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        
      const success = validateInputs({ fullName, username, password, confirmPassword, gender })
      if (!success) return;

      setLoading(true);
      try {
        const { data: userData } = await axios.post('/api/auth/signup', {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        });
          
          console.log(userData);

        localStorage.setItem('chat-user', JSON.stringify(userData));
        setAuthUser(userData);
        toast.success('Signup successful! Welcome to ZenTalk!');
      } catch (error) {
        const message = error.response?.data?.message||error.message||'Something went wrong';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    return { loading, signup };
}
export default useSignup;

