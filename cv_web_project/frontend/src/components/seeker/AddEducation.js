import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import React, { useState } from 'react';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddWork = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);

    const [qualification, setQualification] = useState('');
    const [location, setLocation] = useState('');
    const [yearstart, setYearstart] = useState('');
    const [yearend, setYearend] = useState('');
    const [modules, setModules] = useState('');

    const handleReset = () => {
        setQualification('');
        setLocation('');
        setYearstart('');
        setYearend('');
        setModules('');
    };

    const handleAddeducation = async (event) => {
        event.preventDefault();
        let err;
        const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
        const ownerId = user._id;
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/addeducation',
                { qualification, location, yearstart, yearend, modules, ownerId });
            toast.success(
                "Your education is successfully created.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { qualification, location, yearstart, yearend, modules, ownerId }]);
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
            <h1 className='title-h1'><InlineIcon icon="material-symbols:add" /> Add Education</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleAddeducation}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Add Education</th>
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
                                        <button type="submit" className="button" id="submitBtn">Add</button>
                                        <button className="button" id="resetBtn" onClick={handleReset}>Reset</button>
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

export default AddWork;