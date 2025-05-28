import { createContext
       ,  useContext
       , useState, useEffect 
       } from 'react';


const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userName, setUserName] = useState(localStorage.getItem('user_id') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('user_role') || '');

  useEffect(() => {
    localStorage.setItem('user_id', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('user_role', userRole);
  }, [userRole]);

  const updateUser = (uname, role) => {
    setUserName(uname);
    setUserRole(role);
  };

  return (
     <UserContext.Provider value={{userName, userRole, updateUser}} >
        {children}
      </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};