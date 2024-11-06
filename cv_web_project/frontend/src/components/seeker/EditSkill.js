import '../../style.css';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSkill = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState([]);
    const [skillname, setSkillname] = useState('');
    const [skillicon, setSkillicon] = useState('');
    const [skilllevel, setSkilllevel] = useState('');
  
    useEffect(() => {
      async function fetchData() {
          const res = await axios.get(`http://127.0.0.1:5000/api/skillsearchid/${id}`);
          const skillData = res.data[0];
          setProfile(res.data);
          setSkillname(skillData.skillname);
          setSkillicon(skillData.skillicon);
          setSkilllevel(skillData.skilllevel);
      }
      fetchData();
      }, [id]);
  
      const handleUpdateskill = async (event) => {
        event.preventDefault();
        let err;
        try {
            const res = await axios.post(`http://127.0.0.1:5000/api/updateskill/${id}`,
                { skillname, skillicon, skilllevel });
                console.log(res);
            toast.success(
                "Your skill is successfully updated.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { skillname, skillicon, skilllevel }]);
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
            <h1 className='title-h1'><InlineIcon icon="material-symbols:edit" /> Edit Skill</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleUpdateskill}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Edit Skill</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold" width="35%">*Skill Name:</td>
                                <td><input type="text" className="forminput" placeholder='Skill Name...' value={skillname} onChange={(event) => setSkillname(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Icon:</td>
                                <td>
                                    <input type="text" className="forminput" placeholder='Skill Icon...' value={skillicon} onChange={(event) => setSkillicon(event.target.value)} /><br/>
                                    <p class="companies-reasons-p">Only icon-sets.iconify are supported.<br/>Find more icons: <Link to='https://icon-sets.iconify.design/'>https://icon-sets.iconify.design/</Link></p>
                                </td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">Skill Level (%):</td>
                                <td>
                                    <input type="number" id="removeNumpointer" className="forminput" placeholder='Skill Level...' min='0' max='100' required value={skilllevel} onChange={(event) => setSkilllevel(event.target.value)} />
                                </td>
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

export default EditSkill
