import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes/router.jsx';
import { AuthContextProvider } from './context/AuthProvider.jsx';
import { SocketContextProvider } from './context/SocketProvider.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SocketContextProvider>
      <RouterProvider router={router} />
    </SocketContextProvider>
  </AuthContextProvider>,
);
