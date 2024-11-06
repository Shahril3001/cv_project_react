import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import axios from 'axios';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';

const Slideshowlist = () => {
    const [slideshowlist, setSlideshowlist] = useState([]);
    useEffect(() => {
        async function fetchData() {
          const res = await axios.get('http://127.0.0.1:5000/api/showslideshowlist');
          if (res.data) {
            setSlideshowlist(res.data);
          } else {
            toast.warn(
            "Oops! Empty data.",
                { className: "toast-message", hideProgressBar: true}
            );
          }
        }
        fetchData();
    }, []);

    const handleDeleteslideshow = async(_id) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/deleteslideshow', {_id});
            console.log(res.data);
            if (res.data===false){
                toast.error(
                    "Deletion failed due to employee account less than 1.",
                    { className: "toast-message", hideProgressBar: true}
                );
            }else{
                toast.warn(
                    `Data being deleted. ID: ${_id}`,
                    { className: "toast-message", hideProgressBar: true}
                );
                setTimeout(() => {window.location.reload();}, 2500);
            }
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
                <h1 className='title-h1'><InlineIcon icon="ri:slideshow-fill" /> Slideshow List</h1>
                <div className="card-container">
                <Link to={"/admin/addslideshow"}><InlineIcon icon="material-symbols:add" className="addbutton" id="addBtn" /></Link>
                <table id="listtable">
                  <tr>
                    <th width="5%">#</th>
                    <th colSpan={2}>Details</th>
                    <th width="15%">Action</th>
                  </tr>
                  
                  {slideshowlist.map((item, idx) => (
                    <tr key={idx}>
                        <td>{idx+1}</td>
                        <td width="25%">
                            <img src={`${item.imageUrl}`} className="listtable-img" alt="slideshow"/>
                        </td>
                        <td>
                            <p><b>Caption:</b> {item.caption}</p>
                        </td>
                        <td>
                            <button className="button" id="deleteBtn" onClick={() => handleDeleteslideshow(item._id)}><InlineIcon icon="material-symbols:delete"/> Delete</button>
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
export default Slideshowlist