import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import '../../style.css';
import React, { useState } from 'react';
import { InlineIcon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addslideshow = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    caption: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddslideshow = async (e) => {
    e.preventDefault();
    let err;
    const formData = new FormData();
    formData.append("imgfile", selectedFile);
    formData.append("caption", newUser.caption);
    console.log(selectedFile);
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/addslideshow", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      toast.success(
        "Slideshow image uploaded successfully.",
        { className: "toast-message", hideProgressBar: true}
      );
      navigate('/admin/slideshowlist')
    } catch (err) {
      console.error(err);
      toast.error(
        "Oops! Error. Unable to upload image. Please try later.",
        { className: "toast-message", hideProgressBar: true}
      );
    }
  };

  return (
    <div className="card">
      <h1 className='title-h1'><InlineIcon icon="material-symbols:add" /> Add Slideshow</h1>
      <div className="card-container">
        <div id="form-container">
          <p>Required fields are marked with an asterisk (*).</p>
          <form onSubmit={handleAddslideshow} encType="multipart/form-data">
            <table id="formtable">
              <tbody>
                <tr>
                  <th colSpan={2}>Add Slideshow</th>
                </tr>
                <tr>
                  <td className="formtable-bold">*Slideshow image:</td>
                  <td><input type="file" className="forminput" required onChange={handleFileInputChange} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Caption:</td>
                  <td><input type="text" className="forminput" name="caption" placeholder='Caption...' required onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <center>
                      <button type="submit" className="button" id="submitBtn">Submit</button>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addslideshow;
