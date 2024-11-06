import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';

const Skilllist = () => {
    const [skillitem, setSkillitem] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
            const res = await axios.get(`http://127.0.0.1:5000/api/skill/${user._id}`);
            setSkillitem(res.data);
        }
        fetchData();
    }, []);

    const handleDeleteskill = async (_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deleteskill', { _id });
            console.log(res.data);
            toast.warn(
                `Skill item being deleted. ID: ${_id}`,
                { className: "toast-message", hideProgressBar: true }
            );
            setTimeout(() => { window.location.reload(); }, 2500);
        } catch (err) {
            console.log(err);
            toast.warn(
                err,
                { className: "toast-message", hideProgressBar: true }
            );
        }
    }

    const content = (
        <div>
            <div className="card">
                <h1 className='title-h1'><InlineIcon icon="bi:tools" className='title-icon' />Skill</h1>
                <div className="card-container">
                    <Link to={"/seeker/addskill"}><InlineIcon icon="material-symbols:add" className="addbutton" id="addBtn" /></Link>
                    <table id="listtable">
                        <tr>
                            <th width="5%">#</th>
                            <th>Details</th>
                            <th width="15%">Action</th>
                        </tr>
                        {skillitem.map((item, idx) => (
                            <tr>
                                <td>{idx + 1}</td>
                                <td key={idx}>
                                    <p><b><InlineIcon icon={item.skillicon} className="main-icon" />{item.skillname}</b>
                                        {item.skilllevel >= 80 ? <div className="language-level">Expert ({item.skilllevel}%)</div> :
                                        item.skilllevel >= 60 ? <div className="language-level">Proficient ({item.skilllevel}%)</div> :
                                            item.skilllevel >= 40 ? <div className="language-level">Competent ({item.skilllevel}%)</div> :
                                            item.skilllevel >= 20 ? <div className="language-level">Advanced Beginner ({item.skilllevel}%)</div> :
                                                <div className="language-level">Novice ({item.skilllevel}%)</div>
                                        }
                                    </p>
                                </td>
                                <td>
                                    <Link to={`/seeker/editskill/${item._id}`}><button className="button" id="editBtn"><InlineIcon icon="material-symbols:edit" /> Edit</button></Link>
                                    <button className="button" id="deleteBtn" onClick={() => handleDeleteskill(item._id)}><InlineIcon icon="material-symbols:delete" /> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    )

    return content
}
export default Skilllist