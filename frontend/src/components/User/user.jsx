// src/User/user.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUserName(decoded.username || '');
        setUserRole(decoded.role || '');
      } catch (err) {
        setUserName('');
        setUserRole('');
      }
    } else {
      setUserName('');
      setUserRole('');
    }
    setIsAuthReady(true);
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  const updateUser = (token) => {
    setAccessToken(token);
  };

  const logout = () => {
    setUserName('');
    setUserRole('');
    setAccessToken('');
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ userName, userRole, accessToken, updateUser, logout, isAuthReady }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
