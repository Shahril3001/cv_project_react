import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import { InlineIcon } from '@iconify/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const date = new Date();
  const currentlogin = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);
  const handleReset = () => {
    setEmail('');
    setPassword('');
  };

  const submitCVSeekerlogin = async(event) => {
    event.preventDefault();
    let err;
    try {
      setProfile([...profile, { email, password}]);
      const res = await axios.post('http://127.0.0.1:5000/api/logincvseeker', { email, password, currentlogin});
      if(res.data==="Password didn't match."){
        toast.error(
          "Password didn't match.",
          { className: "toast-message", autoClose: true, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, }
        );
      }else if(res.data==="User not registered."){
        toast.error(
          "User not registered.",
          { className: "toast-message", autoClose: true, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, }
        );
      }else{
        console.log(res.data.user);
        localStorage.setItem("MyCVSeeker", JSON.stringify(res.data.user));
        localStorage.setItem("seekerLoggedin",true);
        toast.success(
          `You have successfully logged in.\n Hello ${res.data.user.username}. Wait a moments.`,
          { className: "toast-message", autoClose: true, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, }
        );
        setTimeout(() => {navigate('/seeker');}, 2500);
      }
    } catch (err) {
      toast.error(
        "Oops! Error. Unable to login. Please try later.",
        { className: "toast-message", autoClose: true, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, }
      );
    }
  };

  const [adminProfile, setadminProfile] = useState([]);
  const [adminUsername, setadminUsername] = useState('');
  const [adminPassword, setadminPassword] = useState('');
  const adminDate = new Date();
  const admincurrentLogin = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(adminDate);
  const adminhandleReset = () => {
    setadminUsername('');
    setadminPassword('');
  };

  const submitEmployeelogin = async(event) => {
    event.preventDefault();
    let err;
    try {
      setadminProfile([...adminProfile, { username, password}]);
      const res = await axios.post('http://127.0.0.1:5000/api/loginadmin', { adminUsername, adminPassword, admincurrentLogin});
      if(res.data==="Password didn't match."){
        toast.error(
          "Password didn't match.",
          { className: "toast-message", hideProgressBar: true}
        );
      }else if(res.data==="User not registered."){
        toast.error(
          "User not registered.",
          { className: "toast-message", hideProgressBar: true}
        );
      }else{
        console.log(res.data.user);
        localStorage.setItem("MyAdminSeeker", JSON.stringify(res.data.user));
        localStorage.setItem("adminLoggedin",true);
        toast.success(
          `You have successfully logged in.\n Hello ${res.data.user.username}. Wait a moments.`,
          { className: "toast-message",autoClose: false, hideProgressBar: true}
        );
        setTimeout(() => {navigate('/admin');}, 2500);
      }
    } catch (err) {
      toast.error(
        "Oops! Error. Unable to login. Please try later.",
        { className: "toast-message", hideProgressBar: true}
      );
    }
  };

  // Tab code
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) => activeIndex === index ? className : "";

  return (
    <div className="card">
      <h1 className='title-h1'><InlineIcon icon="bx:log-in" /> Login</h1>
      <div className="card-container">
        <div id="form-container">
          
          {/* Tab button */}
          <div className="tabs">
            <button className={`tab ${checkActive(1, "active")}`} onClick={() => handleClick(1)}>
              <InlineIcon icon="mdi:user-group" /> CV Seeker
            </button>
            <button className={`tab ${checkActive(2, "active")}`} onClick={() => handleClick(2)}>
              <InlineIcon icon="clarity:employee-group-solid" /> Employee
            </button>
          </div>

          {/* Tab content */}
          <div className="panels">
            <div className={`panel ${checkActive(1, "active")}`}>
              <p>Required fields are marked with an asterisk (*).</p>
              <form onSubmit={submitCVSeekerlogin}>
                <table id="formtable">
                  <tr>
                    <th colSpan={2}>CV Seeker</th>
                  </tr>
                  <tr>
                    <td className="formtable-bold">*Email:</td>
                    <td>
                      <input type="email" className="forminput" placeholder='Email...' required value={email} onChange={(event) => setEmail(event.target.value)} />
                    </td>
                  </tr>
                  <tr>
                    <td className="formtable-bold">*Password:</td>
                    <td><input type="password" className="forminput" placeholder='Password...' required value={password} onChange={(event) => setPassword(event.target.value)} /></td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <center>
                        <button type="submit" className="button" id="submitBtn">Login</button>
                        <button className="button" id="resetBtn" onClick={handleReset}>Reset</button>
                      </center>
                    </td>
                  </tr>
                </table>
              </form>
              <p>Forgot username or password? Please click <b><Link to="/forgot">Find Account</Link></b>.</p>
              <p>Don't have any account yet? Click <b><Link to="/register">Sign Up</Link></b> to create new account.</p>
            </div>
            <div className={`panel ${checkActive(2, "active")}`}>
              <p>Required fields are marked with an asterisk (*). #Restricted site. Only for administrators.</p>
              <form onSubmit={submitEmployeelogin}>
                <table id="formtable">
                  <tr>
                    <th colSpan={2}>Employee</th>
                  </tr>
                  <tr>
                    <td className="formtable-bold">*Name:</td>
                    <td><input type="text" className="forminput" placeholder='Name...' value={adminUsername} onChange={(event) => setadminUsername(event.target.value)} /></td>
                  </tr>
                  <tr>
                    <td className="formtable-bold">*Password:</td>
                    <td><input type="password" className="forminput" placeholder='Password...' value={adminPassword} onChange={(event) => setadminPassword(event.target.value)} /></td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <center>
                        <button type="submit" className="button" id="submitBtn">Login</button>
                        <button className="button" id="resetBtn" onClick={adminhandleReset}>Reset</button>
                      </center>
                    </td>
                  </tr>
                </table>
              </form>
              <br />
            </div>
          </div>
        </div>

      </div>
      <ToastContainer position="top-left" />
    </div>
  )
}

export default Login