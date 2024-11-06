import React from 'react'
import '../../style.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { InlineIcon } from '@iconify/react';
import { SocialData } from "../../data/SocialData";

const disclaimer = () => toast.warn(
    "Disclaimer:-\nAll content and information on the website is for informational and educational purposes only.", 
    { className: "toast-message", hideProgressBar: true}
);

const developer = () => toast.info(
    "Created:-\nShahril Radziman bin Silau (B20210020) & Muhammad Zarif Amsyar Bin Raffaie (B20210382)", 
    { className: "toast-message", hideProgressBar: true}
);



const AdminFooter = () => {

    const content = (
        <footer>
            <div className="footer">
                <div id="socialmedia">
                    <h1>Connect with Us</h1>
                    <p>Join your colleagues, classmates, and friends on CVSeeker</p><br/>
                    {SocialData.map((item, idx) => (
                    <a href={item.sociallink} className="socialIcon"><InlineIcon icon={item.icon}/></a>
                    ))}
                </div>
                

                <div id="disclaimer">
                    <div className="copyright-container" id="copyright-container-left">
                        <li><Link onClick={developer}>Group 2 (Amsyar & Shahril)</Link></li>
                        <li><Link onClick={disclaimer}>Disclaimer</Link></li>
                    </div>
                    <div className="copyright-container" id="copyright-container-right">
                        <p>Copyright © 2023 <Link to="/admin">CVSeekerBN</Link>. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-left"/>
        </footer>
    )
    return content
}

export default AdminFooter