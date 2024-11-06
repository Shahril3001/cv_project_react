import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import React, { useState } from 'react';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSkill = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);

    const [skillname, setSkillname] = useState('');
    const [skillicon, setSkillicon] = useState('');
    const [skilllevel, setSkilllevel] = useState('');

    const handleReset = () => {
        setSkillname('');
        setSkillicon('');
        setSkilllevel('');
    };

    const handleAddeducation = async (event) => {
        event.preventDefault();
        let err;
        const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
        const ownerId = user._id;
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/addskill',
                { skillname, skillicon, skilllevel, ownerId });
            toast.success(
                "Your skill is successfully created.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { skillname, skillicon, skilllevel, ownerId }]);
            setSkillname('');
            setSkillicon('');
            setSkilllevel('');
            navigate('/seeker/skilllist')
        } catch (err) {
            toast.error(
                "Oops! Error. Unable to create new skill. Please try later.",
                { className: "toast-message", hideProgressBar: true }
            );
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:add" /> Add Skill</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleAddeducation}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Add Skill</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold" width="35%">*Skill Name:</td>
                                <td><input type="text" className="forminput" placeholder='Skill Name...' required value={skillname} onChange={(event) => setSkillname(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Icon:</td>
                                <td>
                                    <input type="text" className="forminput" placeholder='Skill Icon...' required value={skillicon} onChange={(event) => setSkillicon(event.target.value)} /><br/>
                                    <p class="companies-reasons-p">Only icon-sets.iconify are supported.<br/>Find more icons: <Link to='https://icon-sets.iconify.design/'>https://icon-sets.iconify.design/</Link>.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Skill Level (%):</td>
                                <td>
                                    <input type="number" id="removeNumpointer" className="forminput" placeholder='Skill Level...' min='0' max='100' required value={skilllevel} onChange={(event) => setSkilllevel(event.target.value)} />
                                </td>
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

export default AddSkill;