import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InlineIcon } from '@iconify/react';
import { Link } from 'react-router-dom';
import '../../style.css';

const AdminDashboard = () => {
    const [adminperson, setadminPerson] = useState([]);
    const [countResult1, setCountResult1] = useState(0);
    const [countResult2, setCountResult2] = useState(0);
    const [countResult3, setCountResult3] = useState(0);
    const [countResult4, setCountResult4] = useState(0);

    useEffect(() => {
      async function fetchData() {
        const user = JSON.parse(localStorage.getItem('MyAdminSeeker'));
        const res = await axios.get(`http://127.0.0.1:5000/api/adminprofile/${user.username}`);
        setadminPerson(res.data);
        const count1 = await axios.get(`http://127.0.0.1:5000/api/countadmin`);
        setCountResult1(count1.data.count);
        const count2 = await axios.get(`http://127.0.0.1:5000/api/countcvseeker`);
        setCountResult2(count2.data.count);
        const count3 = await axios.get(`http://127.0.0.1:5000/api/countslideshow`);
        setCountResult3(count3.data.count);
        const count4 = await axios.get(`http://127.0.0.1:5000/api/countfeedback`);
        setCountResult4(count4.data.count);
      }
      fetchData();
    }, []);

    const content = (
        <div>
            {adminperson.map((item, idx) => (
            <div id="webtitle" key={item.id}>
                <h1 className="webtitle-item">Hello {item.username}!</h1>
                <p>Last login: {item.lastlogin}</p>
                <div className="wave"></div>
            </div>
            ))}
            <div className="card">
                <h1 className='title-h1'>Welcome To Employee Dashboard</h1>
                <h2 className='title-h2'><InlineIcon icon="flat-color-icons:statistics"/> Summary Report</h2>
                <hr/>
                <div className="card-container">
                    <center>
                        <div className='admindashboard-container'>
                            <Link to="/admin/employeelist">
                                <div>
                                    <h2><InlineIcon icon="clarity:employee-group-solid" /> Employee: {countResult1}</h2>
                                </div>
                            </Link>
                        </div>
                        <div className='admindashboard-container'>
                            <Link to="/admin/cvseekerlist">
                                <div>
                                    <h2><InlineIcon icon="mdi:user-group" /> Seeker: {countResult2}</h2>
                                </div>
                            </Link>
                        </div>
                        <div className='admindashboard-container'>
                            <Link to="/admin/feedbacklist">
                                <div>
                                    <h2><InlineIcon icon="ic:baseline-feedback" /> Feedback: {countResult4}</h2>
                                </div>
                            </Link>
                        </div>
                        <div className='admindashboard-container'>
                            <Link to="/admin/slideshowlist">
                                <div>
                                    <h2><InlineIcon icon="ri:slideshow-fill" /> Slideshow: {countResult3}</h2>
                                </div>
                            </Link>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    )

    return content
}
export default AdminDashboard