import React, {useState, useEffect} from 'react';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';

const Feedbacklist = () => {
    const [contactlist, setContactlist] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const res = await axios.get('http://127.0.0.1:5000/api/showfeedbacklist');
          setContactlist(res.data);
          if (res.data) {
            setContactlist(res.data);
          } else {
            toast.warn(
            "Oops! Empty data.",
                { className: "toast-message", hideProgressBar: true}
            );
          }
        }
        fetchData();
    }, []);

    const handleDeletecontact = async(_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deletefeedback', {_id});
            console.log(res.data);
            toast.success(
                `Data being deleted. ID: ${_id}`,
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
                <h1 className='title-h1'><InlineIcon icon="ic:baseline-feedback" /> Feedback List</h1>
                <div className="card-container">
                <table id="listtable">
                  <tr>
                    <th width="5%">#</th>
                    <th colSpan={2}>Details</th>
                    <th width="15%">Action</th>
                  </tr>
                  
                  {contactlist.map((item, idx) => (
                    <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>
                            <p><b>Username:</b> {item.username} ({item.email})</p>
                            <p><b>Subject:</b> {item.subject}</p>
                            <p><b>Type:</b> {item.selectedType}</p>
                            <p><b>Comment:</b> {item.comment}</p>
                        </td>
                        <td width="15%">
                            <p>{item.dateSubmit}</p>
                        </td>
                        <td>
                            <button className="button" id="deleteBtn" onClick={() => handleDeletecontact(item._id)}><InlineIcon icon="material-symbols:delete"/> Delete</button>
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
export default Feedbacklist