import { Toaster } from 'react-hot-toast';

const App = ({children}) => {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {children}
      <Toaster />
    </div>
  );
};

export default App;
