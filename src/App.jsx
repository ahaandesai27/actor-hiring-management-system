import './App.css'
import { Routes, Route } from 'react-router-dom';
import {useUser} from './components/User/user.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'

import LandingPage from './components/Landing/index.jsx';
import HomePage from './components/Home/index.jsx';
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
import Comments from './components/Posts/Comments.jsx';

//chats 
import ChatApp from './components/Chat/index.jsx';

import { useEffect } from 'react';

function App() {
  const { userName } = useUser();
  
  return (
    <Routes>
      {/* Profile page */}
      <Route path="/profile/edit" element={
        <ProtectedRoute>
          <><Navbar /> <EditProfile /></>
        </ProtectedRoute>
      } />
      <Route path="/profile/:username/roles" element={
        <ProtectedRoute>
          <ProfessionalRolesPage />
        </ProtectedRoute>
      } />
      <Route path="/profile/:username" element={
        <ProtectedRoute>
          <><Navbar /> <ProfilePage /></>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <><Navbar /> <ProfilePage /></>
        </ProtectedRoute>
      } />

      {/*Role page*/}
      <Route path="/roles/apply/:roleId" element={
        <ProtectedRoute>
          <><Navbar /> <ApplyRolePage /></>
        </ProtectedRoute>
      } />
      <Route path='/roles/add' element={
        <ProtectedRoute>
          <><Navbar /> <AddRole /></>
        </ProtectedRoute>
      } />
      <Route path="/roles/:role_id/applicants" element={
        <ProtectedRoute>
          <ViewRoleApplicants />
        </ProtectedRoute>
      } />
      <Route path='/roles' element={
        <ProtectedRoute>
          <><Navbar /> <RolePage /></>
        </ProtectedRoute>
      } />

      {/*Posts page*/}
      <Route path="/posts/:postId" element={
        <ProtectedRoute>
          <><Navbar /> <Comments /></>
        </ProtectedRoute>
      } />
      <Route path="/posts" element={
        <ProtectedRoute>
          <><Navbar /> <Posts /></>
        </ProtectedRoute>
      } />

      {/* Auth */}
      <Route path='/login' element={
          <Login />
      } />
      <Route path='/signin' element={
          <SignIn />
      } />

      {/* Chats */}
      <Route path='/chat' element={
        <ProtectedRoute>
          <><Navbar /> <ChatApp /></>
        </ProtectedRoute>
      } />


      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <HomePage />
            </>
          </ProtectedRoute>
        }
      />

      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

export default App;