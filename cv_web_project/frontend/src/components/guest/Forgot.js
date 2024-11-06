import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../style.css';
import { InlineIcon } from '@iconify/react';
import React, { useState } from 'react';
import axios from 'axios';

const Forgot = () => {
    const [email, setEmail] = useState('');

    const handleForgot = async (event) => {
        event.preventDefault();
        let err;
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/findcvseeker', { email });
            if (res.data===false){
                toast.error(
                    "User not registered.",
                    { className: "toast-message",autoClose: false, hideProgressBar: true}
                );
            }else{
                toast.success(
                    `Success. Found a result:-
                    \nUsername: ${JSON.stringify(res.data.username)}. Password: ${JSON.stringify(res.data.password)}`,
                    { className: "toast-message",autoClose: false, hideProgressBar: true,}
                );
            }
            setEmail('');
        } catch (err) {
            toast.error(
                "Oops! Error. Unable to find account. Please try later.",
                { className: "toast-message", autoClose: false, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, }
            );
        }
    };

    return (
        <div className="card">
            <h1 className='title-h1'><InlineIcon icon="material-symbols:find-in-page" /> Find Account</h1>
            <div className="card-container">
                <div id="form-container">
                    <p>Required fields are marked with an asterisk (*).</p>
                    <form onSubmit={handleForgot}>
                        <table id="formtable">
                            <tr>
                                <th colSpan={2}>Find Account</th>
                            </tr>
                            <tr>
                                <td className="formtable-bold">*Email:</td>
                                <td><input type="email" className="forminput" placeholder='Email...' required value={email} onChange={(event) => setEmail(event.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <center>
                                        <button type="submit" className="button" id="submitBtn">Submit</button>
                                    </center>
                                </td>
                            </tr>
                        </table>
                    </form>
                    <p>Already have account? Click <b><Link to="/login">Login</Link></b>.</p>
                    <p>Don't have any account yet? Click <b><Link to="/register">Sign Up</Link></b> to create new account.</p>
                </div>
            </div>
        </div>
    )
}

export default Forgot