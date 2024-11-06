import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';

const Langaugelist = () => {
    const [languageitem, setLanguageitem] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
          const res = await axios.get(`http://127.0.0.1:5000/api/language/${user._id}`);
          setLanguageitem(res.data);
        }
        fetchData();
      }, []);

    const handleDeletelanguage = async(_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deletelanguage', {_id});
            console.log(res.data);
                toast.warn(
                    `Language item being deleted. ID: ${_id}`,
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
                <h1 className='title-h1'><InlineIcon icon="fa-solid:language" className='title-icon'/>Language</h1>
                <div className="card-container">
                <Link to={"/seeker/addlanguage"}><InlineIcon icon="material-symbols:add" className="addbutton" id="addBtn" /></Link>
                <table id="listtable">
                  <tr>
                    <th width="5%">#</th>
                    <th>Details</th>
                    <th width="15%">Action</th>
                  </tr>
                  {languageitem.map((item, idx) => (
                    <tr>
                        <td>{idx+1}</td>
                        <td key={idx}>
                            <p><InlineIcon icon={item.languageicon} className="detail-icon" /><b>{item.languagename}</b>
                            {item.languagelevel >= 100 ? <div className="language-level">Native / Bilingual Proficiency ({item.languagelevel}%)</div> : 
                            item.languagelevel >= 80 ? <div className="language-level">Full Professional Proficiency ({item.languagelevel}%)</div> : 
                            item.languagelevel >= 60 ? <div className="language-level">Professional Working Proficiency ({item.languagelevel}%)</div> : 
                            item.languagelevel >= 40 ? <div className="language-level">Limited Working Proficiency ({item.languagelevel}%)</div> : 
                            item.languagelevel >= 20 ? <div className="language-level">Elementary Proficiency ({item.languagelevel}%)</div> : 
                            <div className="language-level">No Proficiency ({item.languagelevel}%)</div>
                            }
                            </p>
                        </td>
                        <td>
                            <Link to={`/seeker/editlanguage/${item._id}`}><button className="button" id="editBtn"><InlineIcon icon="material-symbols:edit"/> Edit</button></Link>
                            <button className="button" id="deleteBtn" onClick={() => handleDeletelanguage(item._id)}><InlineIcon icon="material-symbols:delete"/> Delete</button>
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
export default Langaugelist