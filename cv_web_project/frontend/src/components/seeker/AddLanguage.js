import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import React, { useState } from 'react';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLanguage = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState([]);

    const [languagename, setLanguagename] = useState('');
    const [languageicon, setLanguageicon] = useState('');
    const [languagelevel, setLanguagelevel] = useState('');

    const handleReset = () => {
        setLanguagename('');
        setLanguageicon('');
        setLanguagelevel('');
    };

    const handleAddlanguage = async (event) => {
        event.preventDefault();
        let err;
        const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
        const ownerId = user._id;
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/addlanguage',
                { languagename, languageicon, languagelevel, ownerId });
            toast.success(
                "Your Language Proficiency is successfully created.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { languagename, languageicon, languagelevel, ownerId }]);
            setLanguagename('');
            setLanguageicon('');
            setLanguagelevel('');
            navigate('/seeker/languagelist')
        } catch (err) {
            toast.error(
                "Oops! Error. Unable to create new language proficiency. Please try later.",
                { className: "toast-message", hideProgressBar: true }
            );
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:add" /> Add Language</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleAddlanguage}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Add Language</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold" width="35%">*Language  Name:</td>
                                <td><input type="text" className="forminput" placeholder='Langauge Name...' required value={languagename} onChange={(event) => setLanguagename(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Icon:</td>
                                <td>
                                    <input type="text" className="forminput" placeholder='Language Icon...' required value={languageicon} onChange={(event) => setLanguageicon(event.target.value)} /><br/>
                                    <p class="companies-reasons-p">Only icon-sets.iconify are supported.<br/>Find more icons: <Link to='https://icon-sets.iconify.design/'>https://icon-sets.iconify.design/</Link>.</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Language Proficiency (%):</td>
                                <td>
                                    <select className="forminput" required value={languagelevel} onChange={(event) => setLanguagelevel(event.target.value)}>
                                        <option>Please select the Language Proficiency...</option>
                                        <option value="0">No Proficiency</option>
                                        <option value="20">Elementary Proficiency</option>
                                        <option value="40">Limited Working Proficiency</option>
                                        <option value="60">Professional Working Proficiency</option>
                                        <option value="80">Full Professional Proficiency</option>
                                        <option value="100">Native / Bilingual Proficiency</option>
                                    </select>
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

export default AddLanguage;