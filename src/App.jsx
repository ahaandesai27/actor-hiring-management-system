import './App.css'
import { Routes, Route } from 'react-router-dom';
import {useUser} from './components/User/user.jsx';

import LandingPage from './components/Landing/index.jsx';
import Navbar from './components/Navbar.jsx';

// auth
import Login from './components/Auth/Login/Login.jsx';
import SignIn from './components/Auth/SignIn/SignIn.jsx';

//profile page 
import ProfilePage from './components/Profile/ProfilePage';
import EditProfile from './components/Profile/EditProfile/EditProfile.jsx';

//roles 
import ViewRoleApplicants from './components/Roles/RolePage/ViewRoleApplicants.jsx';
import RolePage from './components/Roles/RolePage/RolePage.jsx';
import ProfessionalRolesPage from './components/Roles/RolePage/ProfessionalRolesPage.jsx';
import AddRole from './components/Roles/AddRole/AddRole.jsx';
import ApplyRolePage from './components/Roles/RolePage/ApplyRolePage.jsx';

//posts
import Posts from './components/Posts/index.jsx';

import { useEffect } from 'react';

function App() {
  const {updateUser} = useUser();

  useEffect(() => updateUser('CNolan', 'director'));
  return (
    <Routes>
      {/* Profile page */}
      <Route path="/profile/edit" element={<> <Navbar /> <EditProfile /> </>} />
      <Route path="/profile/:username/roles" element={<ProfessionalRolesPage />} />
      <Route path="/profile/:username" element={<> <Navbar /> <ProfilePage /> </>} />
      <Route path="/profile" element={<> <Navbar /> <ProfilePage /> </>} />

      {/*Role page*/}
      <Route path="/roles/apply/:roleId" element = {<><Navbar /> <ApplyRolePage /> </>} />
      <Route path='/roles/add' element={<> <Navbar /> <AddRole /> </> } />
      <Route path="/roles/:role_id/applicants" element={<ViewRoleApplicants />} />
      <Route path='/roles' element={<> <Navbar /> <RolePage /> </>} />

      {/*Posts page*/}
      <Route path="/posts" element={<> <Navbar /> <Posts /> </>} />

      {/* Auth */}
      <Route path='/login' element={<Login />} />
      <Route path='/signin' element={<SignIn />} />

      {/* Location Booking */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;