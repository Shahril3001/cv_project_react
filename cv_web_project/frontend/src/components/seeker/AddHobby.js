import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import React, { useState } from 'react';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddHobby = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [hobbyname, setHobbyname] = useState('');
    const [hobbyicon, setHobbyicon] = useState('');
    const [hobbylevel, setHobbylevel] = useState('');

    const handleReset = () => {
        setHobbyname('');
        setHobbyicon('');
        setHobbylevel('');
    };

    const handleAddhobby = async (event) => {
        event.preventDefault();
        let err;
        const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
        const ownerId = user._id;
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/addhobby',
                { hobbyname, hobbyicon, hobbylevel, ownerId });
            toast.success(
                "Your hobby is successfully created.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { hobbyname, hobbyicon, hobbylevel, ownerId }]);
            setHobbyname('');
            setHobbyicon('');
            setHobbylevel('');
            navigate('/seeker/hobbylist')
        } catch (err) {
            toast.error(
                "Oops! Error. Unable to create new hobby. Please try later.",
                { className: "toast-message", hideProgressBar: true }
            );
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:add" /> Add Hobby</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleAddhobby}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Add Hobby</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold" width="35%">*Hobby Name:</td>
                                <td><input type="text" className="forminput" placeholder='Hobby Name...' required value={hobbyname} onChange={(event) => setHobbyname(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Icon:</td>
                                <td>
                                    <input type="text" className="forminput" placeholder='Hobby Icon...' required value={hobbyicon} onChange={(event) => setHobbyicon(event.target.value)} /><br/>
                                    <p class="companies-reasons-p">Only icon-sets.iconify are supported.<br/>Find more icons: <Link to='https://icon-sets.iconify.design/'>https://icon-sets.iconify.design/</Link>.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Hobby Level (%):</td>
                                <td>
                                    <input type="number" id="removeNumpointer" className="forminput" placeholder='Hobby Level...' min='0' max='100' required value={hobbylevel} onChange={(event) => setHobbylevel(event.target.value)} />
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

export default AddHobby;