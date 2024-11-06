import '../../style.css';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditHobby = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profile, setProfile] = useState([]);

    const [hobbyname, setHobbyname] = useState('');
    const [hobbyicon, setHobbyicon] = useState('');
    const [hobbylevel, setHobbylevel] = useState('');

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://127.0.0.1:5000/api/hobbysearchid/${id}`);
            const hobbyData = res.data[0];
            setProfile(res.data);
            setHobbyname(hobbyData.hobbyname);
            setHobbyicon(hobbyData.hobbyicon);
            setHobbylevel(hobbyData.hobbylevel);
        }
        fetchData();
    }, [id]);

    const handleUpdatehobby = async (event) => {
        event.preventDefault();
        let err;
        try {
            const res = await axios.post(`http://127.0.0.1:5000/api/updatehobby/${id}`,
                { hobbyname, hobbyicon, hobbylevel });
            console.log(res);
            toast.success(
                "Your hobby is successfully updated.",
                { className: "toast-message", hideProgressBar: true }
            );
            setProfile([...profile, { hobbyname, hobbyicon, hobbylevel }]);
            setHobbyname('');
            setHobbyicon('');
            setHobbylevel('');
            navigate('/seeker/hobbylist')
        } catch (err) {
            toast.error(
                "Oops! Error. Unable to update hobby. Please try later.",
                { className: "toast-message", hideProgressBar: true }
            );
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:edit" /> Edit Hobby</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleUpdatehobby}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Edit Hobby</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold" width="35%">*Hobby Name:</td>
                                <td><input type="text" className="forminput" placeholder='Hobby Name...' required value={hobbyname} onChange={(event) => setHobbyname(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Icon:</td>
                                <td>
                                    <input type="text" className="forminput" placeholder='Hobby Icon...' required value={hobbyicon} onChange={(event) => setHobbyicon(event.target.value)} /><br />
                                    <p class="companies-reasons-p">Only icon-sets.iconify are supported.<br/>Find more icons: <Link to='https://icon-sets.iconify.design/'>https://icon-sets.iconify.design/</Link></p>
                                </td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Hobby Level (%):</td>
                                <td>
                                    <input type="number" id="removeNumpointer" className="forminput" placeholder='Hobby Level...' min='0' max='100' required value={hobbylevel} onChange={(event) => setHobbylevel(event.target.value)} />
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

export default EditHobby
