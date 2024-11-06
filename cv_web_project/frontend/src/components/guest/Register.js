import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import React, { useState } from 'react';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState([]);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastlogin] = useState('-');


  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmitsignup = async (event) => {
    event.preventDefault();
    let err;
    if (password === confirmPassword) {
      try {
        const res = await axios.post('http://127.0.0.1:5000/api/addcvseeker', { username, email, password, lastlogin });
        if (res.data === true) {
          toast.error(
            "User already exist.",
            { className: "toast-message", hideProgressBar: true }
          );
        } else {
          toast.success(
            "Your account is successfully created.",
            { className: "toast-message", hideProgressBar: true }
          );
          setProfile([...profile, { username, email, password, lastlogin }]);
          setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('');
          navigate('/login')
        }
      } catch (err) {
        toast.error(
          "Oops! Error. Unable to create new account. Please try later.",
          { className: "toast-message", hideProgressBar: true }
        );
      }
    } else {
      toast.warn(
        "Oops! Your password is not the same as your confirm password.",
        { className: "toast-message", hideProgressBar: true }
      );
      console.log(err);
    }



  };

  return (
    <div className="card">
      <h1 className='title-h1'><InlineIcon icon="mdi:register" /> Sign Up</h1>
      <div className="card-container">
        <div id="form-container">
          <p>Required fields are marked with an asterisk (*).</p>
          <form onSubmit={handleSubmitsignup}>
            <table id="formtable">
              <tr>
                <th colSpan={2}>Sign Up</th>
              </tr>
              <tr>
                <td className="formtable-bold">*Username:</td>
                <td><input type="text" className="forminput" placeholder='Username...' required value={username} onChange={(event) => setUsername(event.target.value)} /></td>
              </tr>
              <tr>
                <td className="formtable-bold">*Email:</td>
                <td><input type="email" className="forminput" placeholder='Email...' required value={email} onChange={(event) => setEmail(event.target.value)} /></td>
              </tr>
              <tr>
                <td className="formtable-bold">*Password:</td>
                <td><input type="password" className="forminput" placeholder='Password...' min='8' required value={password} onChange={(event) => setPassword(event.target.value)} /></td>
              </tr>
              <tr>
                <td className="formtable-bold">*Confirm Password:</td>
                <td><input type="password" className="forminput" placeholder='Confirm Password...' min='8' required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <center>
                    <button type="submit" className="button" id="submitBtn">Submit</button>
                    <button className="button" id="resetBtn" onClick={handleReset}>Reset</button>
                  </center>
                </td>
              </tr>
            </table>
          </form>
          <p>Already have account? Click <b><Link to="/login">Login</Link></b>.</p>
        </div>
      </div>
    </div>
  )
}

export default Register