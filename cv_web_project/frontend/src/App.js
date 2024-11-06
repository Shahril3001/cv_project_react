import { Routes, Route } from 'react-router-dom';
import GuestLayout from './components/guest/GuestLayout';
import Home from './components/guest/Home';
import About from './components/guest/About';
import Contact from './components/guest/Contact';
import Forgot from './components/guest/Forgot';
import Register from './components/guest/Register';
import Login from './components/guest/Login';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import CVSeekerlist from './components/admin/CVSeekerlist';
import ViewCV from './components/admin/ViewCV';
import Employeelist from './components/admin/Employeelist';
import Addadmin from './components/admin/Addadmin';
import Editadmin from './components/admin/Editadmin';
import Feedbacklist from './components/admin/Feedbacklist';
import Slideshowlist from './components/admin/Slideshowlist';
import Addslideshow from './components/admin/Addslideshow';

import SeekerLayout from './components/seeker/SeekerLayout';
import Welcome from './components/seeker/Welcome';
import UserProfile from './components/seeker/UserProfile';
import Worklist from './components/seeker/Worklist';
import Educationlist from './components/seeker/Educationlist';
import Skilllist from './components/seeker/Skilllist';
import Languagelist from './components/seeker/Languagelist';
import Hobbylist from './components/seeker/Hobbylist';
import ContactS from './components/seeker/ContactS';
import AddEducation from './components/seeker/AddEducation';
import AddHobby from './components/seeker/AddHobby';
import AddLanguage from './components/seeker/AddLanguage';
import AddSkill from './components/seeker/AddSkill';
import AddWork from './components/seeker/AddWork';
import EditSkill from './components/seeker/EditSkill';
import EditEducation from './components/seeker/EditEducation';
import EditHobby from './components/seeker/EditHobby';
import EditLanguage from './components/seeker/EditLanguage';
import EditWork from './components/seeker/EditWork';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Home />}/>
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="register" element={<Register />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="seeker" element={<SeekerLayout />}>
        <Route index element={<Welcome />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="worklist" element={<Worklist />} />
        <Route path="educationlist" element={<Educationlist />} />
        <Route path="skilllist" element={<Skilllist />} />
        <Route path="languagelist" element={<Languagelist />} />
        <Route path="hobbylist" element={<Hobbylist />} />
        <Route path="contactseeker" element={<ContactS />} />

        <Route path="/seeker/addeducation" element={<AddEducation />} />
        <Route path="/seeker/addhobby" element={<AddHobby />} />
        <Route path="/seeker/addlanguage" element={<AddLanguage />} />
        <Route path="/seeker/addskill" element={<AddSkill />} />
        <Route path="/seeker/addwork" element={<AddWork />} />

        <Route path="/seeker/editeducation/:id" element={<EditEducation />} />
        <Route path="/seeker/edithobby/:id" element={<EditHobby />} />
        <Route path="/seeker/editlanguage/:id" element={<EditLanguage />} />
        <Route path="/seeker/editskill/:id" element={<EditSkill />} />
        <Route path="/seeker/editwork/:id" element={<EditWork />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />}/>
        <Route path="cvseekerlist" element={<CVSeekerlist />} />
        <Route path="/admin/viewcv/:id" element={<ViewCV />} />
        <Route path="employeelist" element={<Employeelist />} />
        <Route path="/admin/addadmin" element={<Addadmin />} />
        <Route path="/admin/editadmin/:id" element={<Editadmin />} />
        <Route path="feedbacklist" element={<Feedbacklist />} />
        <Route path="slideshowlist" element={<Slideshowlist />} />
        <Route path="/admin/addslideshow" element={<Addslideshow />} />
      </Route>
    </Routes>
  );
}

export default App;
