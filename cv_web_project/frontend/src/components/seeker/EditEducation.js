import '../../style.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEducation = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [qualification, setQualification] = useState('');
    const [location, setLocation] = useState('');
    const [yearstart, setYearstart] = useState('');
    const [yearend, setYearend] = useState('');
    const [modules, setModules] = useState('');
  
    useEffect(() => {
      async function fetchData() {
          const res = await axios.get(`http://127.0.0.1:5000/api/educationsearchid/${id}`);
          const educationData = res.data[0];
          setProfile(res.data);
          setQualification(educationData.qualification);
          setLocation(educationData.location);
          setYearstart(educationData.yearstart);
          setYearend(educationData.yearend);
          setModules(educationData.modules);
      }
      fetchData();
      }, [id]);
  
      const handleUpdateeducation = async (event) => {
        event.preventDefault();
        let err;
        try {
            const res = await axios.post(`http://127.0.0.1:5000/api/updateeducation/${id}`,
                { qualification, location, yearstart, yearend, modules });
                console.log(res);
            toast.success(
                "Your education is successfully updated.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { qualification, location, yearstart, yearend, modules }]);
            setQualification('');
            setLocation('');
            setYearstart('');
            setYearend('');
            setModules('');
            navigate('/seeker/educationlist')
        } catch (err) {
            toast.error(
                "Oops! Error. Unable to create new education. Please try later.",
                { className: "toast-message", hideProgressBar: true }
            );
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:edit" /> Edit Education</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleUpdateeducation}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Edit Education</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold" width="35%">*Academic qualification:</td>
                                <td><input type="text" className="forminput" placeholder='Academic qualification...' required value={qualification} onChange={(event) => setQualification(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*School/ College/ Institute/ University:</td>
                                <td><input type="text" className="forminput" placeholder='Location...' required value={location} onChange={(event) => setLocation(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Date Start:</td>
                                <td>
                                    <input type="text" className="forminput" placeholder='Date Start...' required value={yearstart} onChange={(event) => setYearstart(event.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Date End:</td>
                                <td>
                                    <input type="text" className="forminput" placeholder='Date End...' required value={yearend} onChange={(event) => setYearend(event.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Modules:</td>
                                <td><textarea className="forminput" placeholder='Modules...' required value={modules} onChange={(event) => setModules(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <center>
                                        <button type="submit" className="button" id="submitBtn">Update</button>
                                    </center>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditEducation
