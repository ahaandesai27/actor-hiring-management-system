import { Routes, Route } from 'react-router-dom';
import {useUser} from './components/User/user.jsx';
import ProtectedRoute from './components/Utils/ProtectedRoute.jsx'

import LandingPage from './components/Landing/index.jsx';
import HomePage from './components/Home/index.jsx';
import Navbar from './components/Utils/Navbar.jsx';

// auth
import Login from './components/Auth/Login.jsx';
import SignUp from './components/Auth/Signup/Signup.jsx';

//profile page 
import ProfilePage from './components/Profile/ProfilePage';
import EditProfile from './components/Profile/EditProfile/EditProfile.jsx';

//roles 
import ViewRoleApplicants from './components/Roles/RolePage/ViewRoleApplicants.jsx';
import RolePage from './components/Roles/RolePage/RolePage.jsx';
import AddRole from './components/Roles/AddRole/AddRole.jsx';
import ApplyRolePage from './components/Roles/RolePage/ApplyRolePage.jsx';

//posts
import Posts from './components/Posts/index.jsx';
import Comments from './components/Posts/Comments.jsx';
import CreatePost from './components/Posts/createPost.jsx';

//chats 
import ChatApp from './components/Chat/index.jsx';

import NotFound from './components/Utils/404.jsx';


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
      <Route path="/posts/add" element={
        <ProtectedRoute>
          <><Navbar /> <CreatePost /></>
        </ProtectedRoute>
      } />

      {/* Auth */}
      <Route path='/login' element={
          <Login />
      } />
      <Route path='/signup' element={
          <SignUp />
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;