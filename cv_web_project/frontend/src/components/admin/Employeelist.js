import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';

const Employeelist = () => {
    const [adminlist, setAdminlist] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://127.0.0.1:5000/api/showemployeelist');
            setAdminlist(res.data);
            console.log(res.data);
            if (res.data) {
                setAdminlist(res.data);
            } else {
                toast.warn(
                    "Oops! Empty data.",
                    { className: "toast-message", hideProgressBar: true }
                );
            }
        }
        fetchData();
    }, []);

    const handleDeleteadmin = async (_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deleteadmin', { _id });
            console.log(res.data);
            if (res.data === false) {
                toast.error(
                    "Deletion failed due to employee account less than 1.",
                    { className: "toast-message", hideProgressBar: true }
                );
            } else {
                toast.warn(
                    `Employee Item being deleted. ID: ${_id}`,
                    { className: "toast-message", hideProgressBar: true }
                );
                setTimeout(() => { window.location.reload(); }, 2500);
            }
        } catch (err) {
            console.log(err);
            toast.warn(
                err,
                { className: "toast-message", hideProgressBar: true }
            );
        }
    }

    function getFirstLetter(string) {
        return string.charAt(0).toUpperCase();
    }

    const content = (
        <div>
            <div className="card">
                <h1 className='title-h1'><InlineIcon icon="clarity:employee-group-solid" /> Employee List</h1>
                <div className="card-container">
                    <Link to={"/admin/addadmin"}><InlineIcon icon="material-symbols:add" className="addbutton" id="addBtn" /></Link>
                    <table id="listtable">
                        <tr>
                            <th width="5%">#</th>
                            <th colSpan={2}>Details</th>
                            <th width="15%">Action</th>
                        </tr>

                        {adminlist.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td style={{ width: '5%', borderRight: 'none' }}>
                                    <span className="firstletteraccount">{getFirstLetter(item.username)}</span>
                                </td>
                                <td>
                                    <p><b>{item.username}</b></p>
                                    <p><b>password:</b> {item.password}</p>
                                    <p><b>Last login:</b> {item.lastlogin}</p>
                                </td>
                                <td>
                                    <Link to={`/admin/editadmin/${item._id}`}><button className="button" id="editBtn"><InlineIcon icon="material-symbols:edit" /> Edit</button></Link>
                                    <button className="button" id="deleteBtn" onClick={() => handleDeleteadmin(item._id)}><InlineIcon icon="material-symbols:delete" /> Delete</button>
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
export default Employeelist