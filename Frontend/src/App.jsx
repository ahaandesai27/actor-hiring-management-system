import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import AddRole from './components/AddRole/AddRole';
import EditProfile from './components/EditProfile/EditProfile';
import Login from './components/Login/Login';
import RolePage from './components/RolePage/RolePage';
import SignIn from './components/SignIn/SignIn';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-page" element={<RolePage />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;