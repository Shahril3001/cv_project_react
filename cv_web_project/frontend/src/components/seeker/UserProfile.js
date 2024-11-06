import "../../style.css";
import { toast } from "react-toastify";
import { InlineIcon } from "@iconify/react";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState([]);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [color,setColor]=useState('#219EBC');
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("MyCVSeeker"));
      const res = await axios.get(`http://127.0.0.1:5000/api/profile/${user._id}`);
      const userData = res.data[0];
      setPerson(res.data);
      setUsername(userData.username);
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setEmail(userData.email);
      setAddress(userData.address);
      setPhone(userData.phone);
      setOccupation(userData.occupation);
      setSelectedFile(userData.imageUrl);
      setPassword(userData.password);
      setConfirmpassword(userData.password);
    }
    fetchData();
  }, []);

  const updateProfile = async (event) => {
    event.preventDefault();
    let err;
    if (password === confirmpassword) {
      const user = JSON.parse(localStorage.getItem("MyCVSeeker"));
      const formData = new FormData();
      formData.append("username", username);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("occupation", occupation);
      formData.append("password", password);
      formData.append("selectedFile", selectedFile);
      formData.append("color", color);
      try {
        const res = await axios.post(
          `http://127.0.0.1:5000/api/updateprofile/${user._id}`,
          formData
        );
        console.log(res.data);
        setPerson([
          ...person,
          {
            username,
            firstname,
            lastname,
            email,
            address,
            phone,
            occupation,
            selectedFile,
            password,
          },
        ]);
        toast.success("Successs! Your profile is successfully updated.", {
          className: "toast-message",
          hideProgressBar: true,
        });
        navigate("/seeker");
      } catch (err) {
        toast.warn(
          "Oops! Error. Unable to update profile. Please try again.",
          { className: "toast-message", hideProgressBar: true }
        );
        console.log(err);
      }
    } else {
      toast.warn("Oops! Your password is not the same as your confirm password.", {
        className: "toast-message",
        hideProgressBar: true,
      });
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className='title-h1'><InlineIcon icon="healthicons:ui-user-profile" className='title-icon'/>User Profile</h1>
        <div className="card-container">
          <div id="form-container">
            <p>This is your profile that will publish in public. (Password not included.) Required fields are marked with an asterisk (*).</p>
            {person.map((p, idx) => (
            <form onSubmit={updateProfile} key={p.id} encType="multipart/form-data">
              <table id="formtable">
                <tr>
                  <th colSpan={2}>User Profile</th>
                </tr>
                <tr>
                  <td className="formtable-bold" width="35%">Username:</td>
                  <td><input type="text" className="forminput" placeholder='Name...' required value={username} onChange={(event) => setUsername(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*First Name:</td>
                  <td><input type="text" className="forminput" placeholder='First Name...' required value={firstname} onChange={(event) => setFirstname(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Last Name:</td>
                  <td><input type="text" className="forminput" placeholder='Last Name...' required value={lastname} onChange={(event) => setLastname(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Email:</td>
                  <td><input type="email" className="forminput" placeholder='Email...'  disabled="true" value={email}  onChange={(event) => setEmail(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Address:</td>
                  <td><input type="text" className="forminput" placeholder='Address...' required value={address} onChange={(event) => setAddress(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Phone:</td>
                  <td><input type="number" id="removeNumpointer" className="forminput" placeholder='Phone...' min='7' required value={phone} onChange={(event) => setPhone(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Occupation:</td>
                  <td><input type="text" className="forminput" placeholder='Occupation...' value={occupation} required onChange={(event) => setOccupation(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Profile image:</td>
                  <td>
                    <p><input type="file" className="forminput" accept=".jpg, .jpeg, .png" required onChange={(event) => setSelectedFile(event.target.files[0])}/>
                    Old image: <img src={selectedFile} alt={username} width="5%" height="5%"/></p>
                  </td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Profile Background Color:</td>
                  <td>
                    <input type="color" required onChange={(event)=>setColor(event.target.value)} />
                    <p class="companies-reasons-p">Only hsl & rgb color are supported.<br/>Converter: <Link to='https://convertacolor.com/'>https://convertacolor.com/</Link></p>
                  </td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Password:</td>
                  <td><input type="password" className="forminput" placeholder='Password...' min='8' required value={password} onChange={(event) => setPassword(event.target.value)} /></td>
                </tr>
                <tr>
                  <td className="formtable-bold">*Confirm Password:</td>
                  <td><input type="password" className="forminput" placeholder='Confirm Password...' min='8' required value={confirmpassword} onChange={(event) => setConfirmpassword(event.target.value)} /></td>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
