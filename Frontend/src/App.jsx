import NewHeader from './components/NewHeader/NewHeader';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import ProfilePage from './components/ProfilePage';
import ViewRoleApplicants from './components/RolePage/ViewRoleApplicants.jsx';
import RolePage from './components/RolePage/RolePage.jsx';
import ProfessionalRolesPage from './components/RolePage/ProfessionalRolesPage.jsx';
import useUser from './components/User/user.js';
import { useEffect } from 'react';

function App() {
  const {updateUser} = useUser();

  useEffect(() => updateUser('iamsrk', 'actor'));
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/roles/:role_id/applicants" element={<ViewRoleApplicants />} />
      <Route path="/profile/:username/roles" element={<ProfessionalRolesPage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path='/roles' element={<RolePage />} />
    </Routes>
  );
}

export default App;