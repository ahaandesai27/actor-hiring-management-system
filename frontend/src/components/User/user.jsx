import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userImage, setUserImage] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUserName(decoded.username || '');
        setUserRole(decoded.role || '');
        setUserImage(decoded.image || '');
      } catch (err) {
        setUserName('');
        setUserRole('');
        setUserImage('');
      }
    } else {
      setUserName('');
      setUserRole('');
      setUserImage('');
    }
    setIsAuthReady(true);
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken);
  }, [accessToken]);

  const updateUser = (token) => {
    setAccessToken(token);
  };

  const setReadonlyUser = () => {
    setAccessToken(''); // ensure decode doesn't run
  };

  const logout = () => {
    setUserName('');
    setUserRole('');
    setUserImage('');
    setAccessToken('');
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{
      userName,
      userRole,
      userImage,
      accessToken,
      updateUser,
      logout,
      isAuthReady,
      setReadonlyUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
