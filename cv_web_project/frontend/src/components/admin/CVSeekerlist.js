import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import noimage from '../../img/noimage.png';

const CVSeekerlist = () => {
    const [cvseekerlist, setSeekerlist] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const res = await axios.get('http://127.0.0.1:5000/api/showseekerlist');
          setSeekerlist(res.data);
          if (res.data) {
            setSeekerlist(res.data);
          } else {
            toast.warn(
            "Oops! Empty data.",
                { className: "toast-message", hideProgressBar: true}
            );
          }
        }
        fetchData();
    }, []);

    const handleDeletecvseeker = async(_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deletecvseeker', {_id});
            console.log(res.data);
            toast.warn(
                `CVSeeker Item being deleted. ID: ${_id}`,
                { className: "toast-message", hideProgressBar: true}
            );
            setTimeout(() => {window.location.reload();}, 2500);
        } catch (err) {
            console.log(err);
            toast.warn(
                err,
                { className: "toast-message", hideProgressBar: true}
            );
        }
    }
    const content = (
        <div>
            <div className="card">
                <h1 className='title-h1'><InlineIcon icon="mdi:user-group" /> CV Seeker List</h1>
                <div className="card-container">
                <table id="listtable">
                  <tr>
                    <th width="5%">#</th>
                    <th colSpan={2}>Details</th>
                    <th width="15%">Action</th>
                  </tr>
                  
                  {cvseekerlist.map((item, idx) => (
                    <tr key={idx}>
                        <td>{idx+1}</td>
                        <td width="10%">
                            <center>
                                {item.imageUrl === null || item.imageUrl === undefined  ?
                                    <img src={noimage} className='listtable-cvseekerlist' alt="no image"/>:
                                    <img src={item.imageUrl} className='listtable-cvseekerlist' alt="user profile picture"/>
                                }
                            </center>
                        </td>
                        <td>
                            <p><b>Username:</b> {item.username} </p>
                            <p><b>Email:</b> {item.email}</p>
                            <p><b>Phone:</b> {item.phone}</p>
                            <p><b>Password:</b> {item.password}</p>
                            <p><b>Last login:</b> {item.lastlogin}</p>
                        </td>
                        <td>
                            <Link to={`/admin/viewcv/${item._id}`}><button className="button" id="viewCVBtn"><InlineIcon icon="pepicons-pop:cv"/> View CV</button></Link>
                            <button className="button" id="deleteBtn" onClick={() => handleDeletecvseeker(item._id)}><InlineIcon icon="material-symbols:delete"/> Delete</button>
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
export default CVSeekerlist