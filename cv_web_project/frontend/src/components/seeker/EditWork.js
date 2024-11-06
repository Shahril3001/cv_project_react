import '../../style.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditWork = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [jobtitle, setJobtitle] = useState('');
    const [location, setLocation] = useState('');
    const [yearstart, setYearstart] = useState('');
    const [yearend, setYearend] = useState('');
    const [description, setDescription] = useState('');
  
    useEffect(() => {
      async function fetchData() {
          const res = await axios.get(`http://127.0.0.1:5000/api/worksearchid/${id}`);
          const workData = res.data[0];
          setProfile(res.data);
          setJobtitle(workData.jobtitle);
          setLocation(workData.location);
          setYearstart(workData.yearstart);
          setYearend(workData.yearend);
          setDescription(workData.description);
      }
      fetchData();
      }, [id]);

      const handleUpdatework = async (event) => {
        event.preventDefault();
        let err;
        try {
            const res = await axios.post(`http://127.0.0.1:5000/api/updatework/${id}`,
                { jobtitle, location, yearstart, yearend, description });
            toast.success(
                "Your work experience is successfully updated.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { jobtitle, location, yearstart, yearend, description }]);
            setJobtitle('');
            setLocation('');
            setYearstart('');
            setYearend('');
            setDescription('');
            navigate('/seeker/worklist')
        } catch (err) {
            toast.error(
                "Oops! Error. Unable to update work experience. Please try later.",
                { className: "toast-message", hideProgressBar: true }
            );
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:edit" /> Edit Work Experience</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleUpdatework}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Edit Work Experience</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold" width="35%">*Job Title:</td>
                                <td><input type="text" className="forminput" placeholder='Job Title...' required value={jobtitle} onChange={(event) => setJobtitle(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Location:</td>
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
                                <td className="formtable-bold">*Description:</td>
                                <td><textarea className="forminput" placeholder='Description...' required value={description} onChange={(event) => setDescription(event.target.value)} /></td>
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

export default EditWork
