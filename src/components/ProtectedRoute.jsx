// src/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useUser } from './User/user.jsx';

const ProtectedRoute = ({ children }) => {
  const { userName, isAuthReady } = useUser();

  if (!isAuthReady) {
    return <div>Loading...</div>; // or a spinner
  }

  return userName ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
