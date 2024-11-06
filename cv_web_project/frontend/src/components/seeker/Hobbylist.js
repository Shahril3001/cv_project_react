import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';

const Hobbylist = () => {
    const [hobbyitem, setHobbyitem] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
            const res = await axios.get(`http://127.0.0.1:5000/api/hobby/${user._id}`);
            setHobbyitem(res.data);
        }
        fetchData();
    }, []);

    const handleDeletehobby = async (_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deletehobby', { _id });
            console.log(res.data);
            toast.warn(
                `Hobby item being deleted. ID: ${_id}`,
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
                <h1 className='title-h1'><InlineIcon icon="game-icons:achievement" className='title-icon' />Hobby</h1>
                <div className="card-container">
                    <Link to={"/seeker/addhobby"}><InlineIcon icon="material-symbols:add" className="addbutton" id="addBtn" /></Link>
                    <table id="listtable">
                        <tr>
                            <th width="5%">#</th>
                            <th>Details</th>
                            <th width="15%">Action</th>
                        </tr>
                        {hobbyitem.map((item, idx) => (


                            <tr>
                                <td>{idx + 1}</td>
                                <td key={idx}>
                                    <p>
                                        <b><InlineIcon icon={item.hobbyicon} className="main-icon" />{item.hobbyname}</b>
                                        {item.hobbylevel >= 80 ? <div className="language-level">Expert ({item.hobbylevel}%)</div> :
                                        item.hobbylevel >= 60 ? <div className="language-level">Proficient ({item.hobbylevel}%)</div> :
                                            item.hobbylevel >= 40 ? <div className="language-level">Competent ({item.hobbylevel}%)</div> :
                                            item.hobbylevel >= 20 ? <div className="language-level">Advanced Beginner ({item.hobbylevel}%)</div> :
                                                <div className="language-level">Novice ({item.hobbylevel}%)</div>
                                        }
                                    </p>
                                </td>
                                <td>
                                    <Link to={`/seeker/edithobby/${item._id}`}><button className="button" id="editBtn"><InlineIcon icon="material-symbols:edit" /> Edit</button></Link>
                                    <button className="button" id="deleteBtn" onClick={() => handleDeletehobby(item._id)}><InlineIcon icon="material-symbols:delete" /> Delete</button>
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
export default Hobbylist