import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';

const Worklist = () => {
    const [workitem, setWorkitem] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
            const res = await axios.get(`http://127.0.0.1:5000/api/work/${user._id}`);
            setWorkitem(res.data);
        }
        fetchData();
    }, []);

    const handleDeletework = async (_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deletework', { _id });
            console.log(res.data);
            toast.warn(
                `Work item being deleted. ID: ${_id}`,
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
                <h1 className='title-h1'><InlineIcon icon="material-symbols:work" className='title-icon' />Work Experience</h1>
                <div className="card-container">
                    <Link to={"/seeker/addwork"}><InlineIcon icon="material-symbols:add" className="addbutton" id="addBtn" /></Link>
                    <table id="listtable">
                        <tr>
                            <th width="5%">#</th>
                            <th>Details</th>
                            <th width="15%">Action</th>
                        </tr>
                        {workitem.map((item, idx) => (


                            <tr>
                                <td>{idx + 1}</td>
                                <td key={idx}>
                                    <p><b>{item.jobtitle}</b></p>
                                    <p id='detailflex'><InlineIcon icon="flat-color-icons:calendar" className="main-icon" />
                                        {item.yearstart === 'Current' || item.yearstart === '2023' ? <span className="currentElement">Current</span> :
                                            <div>{item.yearstart}</div>
                                        } -
                                        {item.yearend === 'Current' || item.yearend === '2023' ? <span className="currentElement">Current</span> :
                                            <div>{item.yearend}</div>
                                        }
                                    </p>
                                    <p id='detailflex'><InlineIcon icon="flat-color-icons:department" className="main-icon" /> {item.location}</p>
                                    <p><InlineIcon icon="flat-color-icons:view-details" className="main-icon" /> {item.description}</p>
                                </td>
                                <td>
                                    <Link to={`/seeker/editwork/${item._id}`}><button className="button" id="editBtn"><InlineIcon icon="material-symbols:edit" /> Edit</button></Link>
                                    <button className="button" id="deleteBtn" onClick={() => handleDeletework(item._id)}><InlineIcon icon="material-symbols:delete" /> Delete</button>
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
export default Worklist