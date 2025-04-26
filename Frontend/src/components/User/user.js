import { useState, useEffect } from 'react';

//setup as context api later

const useUser = () => {
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

  return {
    userName,
    userRole,
    updateUser,
  };
};

export default useUser;
