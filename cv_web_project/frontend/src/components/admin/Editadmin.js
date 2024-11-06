import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Editadmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [adminperson, setadminPerson] = useState([]);

    const [adminUsername, setadminUsername] = useState('');
    const [adminPassword, setadminPassword] = useState('');
    const [adminConfirmPassword, setadminConfirmPassword] = useState('');

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://127.0.0.1:5000/api/adminsearchid/${id}`);
            const adminData = res.data[0];
            setadminPerson(res.data);
            setadminUsername(adminData.username);
            setadminPassword(adminData.password);
            setadminConfirmPassword(adminData.password);
        }
        fetchData();
    }, [id]);

    const handleReset = () => {
        setadminUsername('');
        setadminPassword('');
        setadminConfirmPassword('');
    };

    const handleAdminedit = async (event) => {
        event.preventDefault();
        let err;
        if (adminPassword === adminConfirmPassword) {
            const res = await axios.post(`http://127.0.0.1:5000/api/editadmin/${id}`, { adminUsername, adminPassword });
            try {
                console.log(res.data)
                toast.success(
                    "Employee account is successfully updated.",
                    { className: "toast-message", hideProgressBar: true }
                );
                setadminPerson([...adminperson, { adminUsername, adminPassword }]);
                setadminUsername(''); setadminPassword(''); setadminConfirmPassword('');
                navigate('/admin/employeelist');
            } catch (err) {
                toast.error(
                    "Oops! Error. Unable to create new account. Please try later.",
                    { className: "toast-message", hideProgressBar: true }
                );
            }
        } else {
            toast.warn(
                "Oops! Your password is not the same as the confirm password.",
                { className: "toast-message", hideProgressBar: true }
            );
            console.log(err);
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:edit" /> Edit Employee</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleAdminedit}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Edit Employee</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Username:</td>
                                <td><input type="text" className="forminput" placeholder='Username...' required value={adminUsername} onChange={(event) => setadminUsername(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Password:</td>
                                <td><input type="password" className="forminput" placeholder='Password...' required value={adminPassword} onChange={(event) => setadminPassword(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Confirm Password:</td>
                                <td><input type="password" className="forminput" placeholder='Confirm Password...' required value={adminConfirmPassword} onChange={(event) => setadminConfirmPassword(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <center>
                                        <button type="submit" className="button" id="submitBtn">Submit</button>
                                        <button className="button" id="resetBtn" onClick={handleReset}>Reset</button>
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

export default Editadmin