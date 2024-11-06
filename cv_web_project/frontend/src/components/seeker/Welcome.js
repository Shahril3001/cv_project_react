import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InlineIcon } from '@iconify/react';
import ProgressBar from "../../ProgressBar";
import '../../style.css';
import noimage from '../../img/noimage.png';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const [person, setPerson] = useState([]);
  const [works, setWorks] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [hobbies, setHobbiess] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('MyCVSeeker'));
      const res1 = await axios.get(`http://127.0.0.1:5000/api/profile/${user._id}`);
      setPerson(res1.data);
      const res2 = await axios.get(`http://127.0.0.1:5000/api/work/${user._id}`);
      setWorks(res2.data);
      const res3 = await axios.get(`http://127.0.0.1:5000/api/education/${user._id}`);
      setEducations(res3.data);
      const res4 = await axios.get(`http://127.0.0.1:5000/api/skill/${user._id}`);
      setSkills(res4.data);
      const res5 = await axios.get(`http://127.0.0.1:5000/api/language/${user._id}`);
      setLanguages(res5.data);
      const res6 = await axios.get(`http://127.0.0.1:5000/api/hobby/${user._id}`);
      setHobbiess(res6.data);
    }
    fetchData();
  }, []);

  const scrollWorkdiv = () => {
    const divElement = document.getElementById('work');
    divElement.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollEducationdiv = () => {
    const divElement = document.getElementById('education');
    divElement.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollSkilldiv = () => {
    const divElement = document.getElementById('skill');
    divElement.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollLanguagediv = () => {
    const divElement = document.getElementById('language');
    divElement.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollHobbydiv = () => {
    const divElement = document.getElementById('hobby');
    divElement.scrollIntoView({ behavior: 'smooth' });
  };

  const content = (
    <div>
      {person.map((p, idx) => (
        <div id="webtitle" key={p.id}>
          <h1 className="webtitle-item">Hello {p.username}! Welcome</h1>
          <p>Last login: {p.lastlogin}</p>
          <div className="wave"></div>
        </div>
      ))}
      <center>
        <div className="card" id='profile-button'>
          <div className='profile-container-button' onClick={scrollWorkdiv}><InlineIcon icon="material-symbols:work" /> Work</div>
          <div className='profile-container-button' onClick={scrollEducationdiv}><InlineIcon icon="zondicons:education" /> Education</div>
          <div className='profile-container-button' onClick={scrollSkilldiv}><InlineIcon icon="bi:tools" /> Skill</div>
          <div className='profile-container-button' onClick={scrollLanguagediv}><InlineIcon icon="fa-solid:language" /> Language</div>
          <div className='profile-container-button' onClick={scrollHobbydiv}><InlineIcon icon="game-icons:achievement" /> Hobby</div>
        </div>
      </center>

      <div className="card" id="aside">
        {person.map((p, idx) => (
          <div className="profile-container" style={{ backgroundColor: p.color }} key={p._id}>
            {p.imageUrl === null || p.imageUrl === undefined ?
              <img src={noimage} id="profile-img" alt="Avatar" /> :
              <img src={p.imageUrl} id="profile-img" alt="Avatar" />
            }

            <div id="profile-text" key={p._id}>
              <h2>
                {p.firstname === null || p.firstname === '' || p.firstname === undefined ? <span>ID: {p._id}</span> :
                  <span>{p.firstname}</span>
                }
                {p.lastname === null || p.lastname === '' || p.lastname === undefined ? <span></span> :
                  <span> {p.lastname}</span>
                }
              </h2>
            </div>

          </div>
        ))}
        <div className="detail-container">
          {person.map((p, idx) => (
            <div key={p.id}>
              <p><InlineIcon icon="fxemoji:briefcase" className='detail-icon' />
                {p.occupation === null || p.occupation === '' || p.occupation === undefined ? <span>None</span> :
                  <span>{p.occupation}</span>
                }</p>
              <p><InlineIcon icon="flat-color-icons:home" className='detail-icon' />
                {p.address === null || p.address === '' || p.address === undefined ? <span>None</span> :
                  <span>{p.address}</span>
                }</p>
              <p><InlineIcon icon="fxemoji:email" className='detail-icon' />
                {p.email === null || p.email === '' || p.email === undefined ? <span>None</span> :
                  <span><Link to={p.email}>{p.email}</Link></span>
                }</p>
              <p><InlineIcon icon="flat-color-icons:contacts" className='detail-icon' />
                {p.phone === null || p.phone === '' || p.phone === undefined ? <span>None</span> :
                  <span>{p.phone}</span>
                }</p>
            </div>
          ))}
          <hr />

          <h3 id='skill' className='detail-h3'><InlineIcon icon="bi:tools" className='detail-h3icon' /> Skill</h3>
          {skills.map((item, idx) => (
            <div>
              <p><InlineIcon icon={item.skillicon} className="detail-icon" />{item.skillname}
                {item.skilllevel >= 80 ? <div className="language-level">Expert</div> :
                  item.skilllevel >= 60 ? <div className="language-level">Proficient</div> :
                    item.skilllevel >= 40 ? <div className="language-level">Competent</div> :
                      item.skilllevel >= 20 ? <div className="language-level">Advanced Beginner</div> :
                        <div className="language-level">Novice</div>
                }
              </p>
              <div className="detail-level">
                <ProgressBar key={idx} completed={item.skilllevel} />
              </div>
            </div>
          ))}
          <hr />

          <h3 id='language' className='detail-h3'><InlineIcon icon="fa-solid:language" className='detail-h3icon' /> Language</h3>
          {languages.map((item, idx) => (
            <div>
              <p><InlineIcon icon={item.languageicon} className="detail-icon" />{item.languagename}
                {item.languagelevel >= 100 ? <div className="language-level">Native / Bilingual Proficiency</div> :
                  item.languagelevel >= 80 ? <div className="language-level">Full Professional Proficiency</div> :
                    item.languagelevel >= 60 ? <div className="language-level">Professional Working Proficiency</div> :
                      item.languagelevel >= 40 ? <div className="language-level">Limited Working Proficiency</div> :
                        item.languagelevel >= 20 ? <div className="language-level">Elementary Proficiency</div> :
                          <div className="language-level">No Proficiency</div>
                }
              </p>
              <div className="detail-level">
                <ProgressBar key={idx} completed={item.languagelevel} />
              </div>
            </div>
          ))}
          <hr />
          <h3 id='hobby' className='detail-h3'><InlineIcon icon="game-icons:achievement" className='detail-h3icon' /> Hobby</h3>
          {hobbies.map((item, idx) => (
            <div>
              <p><InlineIcon icon={item.hobbyicon} className="detail-icon" />{item.hobbyname}
                {item.hobbylevel >= 80 ? <div className="language-level">Expert</div> :
                  item.hobbylevel >= 60 ? <div className="language-level">Proficient</div> :
                    item.hobbylevel >= 40 ? <div className="language-level">Competent</div> :
                      item.hobbylevel >= 20 ? <div className="language-level">Advanced Beginner</div> :
                        <div className="language-level">Novice</div>
                }
              </p>
              <div className="detail-level">
                <ProgressBar key={idx} completed={item.hobbylevel} />
              </div>
            </div>
          ))}
          <br />
        </div>
      </div>

      <div className="card" id="main">
        <h1 id='work' className='title-h1'><InlineIcon icon="material-symbols:work" className='title-icon' /> Work Experience</h1>
        {works.map((item, idx) => (
          <div className="main-container">
            <h3>{idx + 1}. {item.jobtitle}</h3>
            <h6>
              <InlineIcon icon="flat-color-icons:calendar" className="main-icon" />
              {item.yearstart === 'Current' || item.yearstart === '2023' ? <span className="currentElement">Current</span> :
                <div>{item.yearstart}</div>
              } -
              {item.yearend === 'Current' || item.yearend === '2023' ? <span className="currentElement">Current</span> :
                <div>{item.yearend}</div>
              }
            </h6>
            <h6><InlineIcon icon="flat-color-icons:department" className="main-icon" /> {item.location}</h6>
            <p>{item.description}</p>
          </div>
        ))}
        <h1 id='education' className='title-h1'><InlineIcon icon="zondicons:education" className='title-icon' />Education</h1>
        {educations.map((item, idx) => (
          <div className="main-container">
            <h3>{idx + 1}. {item.qualification}</h3>
            <h6><InlineIcon icon="flat-color-icons:calendar" className="main-icon" />
              {item.yearstart === 'Current' || item.yearstart === '2023' ? <span className="currentElement">Current</span> :
                <div>{item.yearstart}</div>
              } -
              {item.yearend === 'Current' || item.yearend === '2023' ? <span className="currentElement">Current</span> :
                <div>{item.yearend}</div>
              }
            </h6>
            <h6><InlineIcon icon="flat-color-icons:department" className="main-icon" /> {item.location} </h6>
            <p><b>Modules included:</b> {item.modules}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return content
}
export default Welcome