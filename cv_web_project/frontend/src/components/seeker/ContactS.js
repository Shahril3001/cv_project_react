import '../../style.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { InlineIcon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactS = () => {
  const [person, setPerson] = useState([]);

  const [contact, setContact] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [comment, setComment] = useState('');
  const [selectedType, setSelectedOption] = useState('');
  const date = new Date()
  const dateSubmit = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  const handleReset = () => {
    setSubject('');
    setComment('');
    setSelectedOption('');
  };

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
      const res = await axios.get(`http://127.0.0.1:5000/api/profile/${user._id}`);
      const userData = res.data[0];
      setPerson(res.data);
      setUsername(userData.username);
      setEmail(userData.email);
    }
    fetchData();
  }, []);



  const submitContactinfo = async(event) => {
    event.preventDefault();
    let err;
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/addcontact', { username, email, subject, selectedType, comment, dateSubmit });
      console.log(res.data);
      setContact([...contact, {username, email, subject, selectedType, comment, dateSubmit}]);
      toast.success(
        "Successs! Feedback is successfully added.",
        { className: "toast-message", hideProgressBar: true}
      );
      setSubject('');
      setComment('');
      setSelectedOption('');
    } catch (err) {
      toast.warn(
        "Oops! Error. Unable to submit comment. Please try again.",
        { className: "toast-message", hideProgressBar: true}
      );
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className='title-h1'><InlineIcon icon="ic:round-contact-support" /> Contact</h1>
        <div className="card-container">
          <div id="form-container">
            <h3>Leave a Comment</h3>
            <p>Your email address will not be published. Required fields are marked with an asterisk (*).</p>
            {person.map((p, idx) => (
            <form onSubmit={submitContactinfo} key={p.id}>
              <table id="formtable">
                <tr>
                  <th colSpan={2}>Contact</th>
                </tr>
                <tr>
                  <td className="formtable-bold">Name:</td>
                  <td><input type="text" className="forminput" placeholder='Name...' readOnly value={username} onChange={(event) => setUsername(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">Email:</td>
                  <td><input type="email" className="forminput" placeholder='Email...' readOnly value={email}  onChange={(event) => setEmail(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Subject:</td>
                  <td><input type="text" className="forminput" placeholder='Subject...' required value={subject} onChange={(event) => setSubject(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Type:</td>
                  <td>
                    <select className="forminput" required value={selectedType} onChange={(event) => setSelectedOption(event.target.value)}>
                      <option>Please select the type...</option>
                      <option value="Suggestion">Suggestion</option>
                      <option value="Complaint">Complaint</option>
                      <option value="Report">Report</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Comment:</td>
                  <td><textarea className="forminput" placeholder='Comment...' required value={comment} onChange={(event) => setComment(event.target.value)} /></td>
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
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <h1 className='title-h1'><InlineIcon icon="material-symbols:location-on-rounded" /> Explore location</h1>
        <iframe className="contactmap" title="maplocation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.285102639245!2d114.89642701350938!3d4.891858396448159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x322260012f15e563%3A0xd286d0538ba99a6!2sJobcentre%20Brunei!5e0!3m2!1sms!2sbn!4v1680023725607!5m2!1sms!2sbn" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  )
}

export default ContactS
