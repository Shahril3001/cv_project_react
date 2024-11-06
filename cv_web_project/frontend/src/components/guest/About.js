import React from 'react'
import core1 from '../../img/core1.png';
import core2 from '../../img/core2.png';
import core3 from '../../img/core3.png';
import core4 from '../../img/core4.png';
import core5 from '../../img/core5.png';
import mission from '../../img/mission.png';
import vision from '../../img/vision.png';
import logo from '../../img/logo.png';
import { InlineIcon } from '@iconify/react';


const About = () => {
  return (
    <div>
        <div className="card">
          <h1 className='title-h1'><InlineIcon icon="ic:sharp-history-edu" /> Background History</h1>
          <div className="card-container" id="about-history">
            <center>
              <div id="about-history-img"><img src={logo} style={{ width: '175px' }} alt="logo" /></div>
            </center>
            <p>Launched in 2017, CVSeekerBN is a leading recruitment platform based in Brunei. Our founders recognized the need for a more efficient and effective way for job seekers and employers to connect, and built CVSeekerBN as a solution to this challenge.</p>
            <p>Over the years, we have grown to become a trusted partner to job seekers and employers alike, providing a range of services that help our clients achieve their career and business goals. Our platform is designed to make the job search process easier and more streamlined, while providing job seekers with the tools and resources they need to succeed in today's competitive job market.</p>
          </div>
        </div>
        <div className="card">
          <h1 className='title-h1'><InlineIcon icon="mdi:goal" /> Mission & Vision</h1>
          <div className="card-container">
            <center>
              <div className='about-container'>
                <h2>Mission Statement</h2>
                <img src={mission} className="about-container-img" alt="mission" />
                <p>Our mission is to empower job seekers with the tools and resources they need to find their dream job, and help employers find the best talent to grow their business. We are committed to providing a platform that is user-friendly, intuitive, and effective, while delivering exceptional customer service to all of our clients.</p>
              </div>
              <div className='about-container'>
                <h2>Vision Statement</h2>
                <img src={vision} className="about-container-img" alt="vision" />
                <p>Our vision is to be the go-to recruitment platform for job seekers and employers in Brunei and beyond. We are dedicated to providing innovative solutions that streamline the job search process, while creating a culture of excellence that attracts and retains the best talent in the industry.</p>
              </div>
            </center>
          </div>
        </div>
        <div className="card">
          <h1 className='title-h1'><InlineIcon icon="ri:coreos-fill" /> Core Values</h1>
          <div className="card-container">
            <center>
              <div className='about-container'>
                <h2>Customer focus</h2>
                <img src={core1} className="about-container-img" alt="core1" />
                <p>We put our clients' needs at the forefront of everything we do, and are committed to delivering solutions that exceed their expectations.</p>
              </div>
              <div className='about-container'>
                <h2>Innovation</h2>
                <img src={core2} className="about-container-img" alt="core2" />
                <p>We are constantly seeking out new and better ways to solve problems and drive growth, and encourage creativity and out-of-the-box thinking among our team members.</p>
              </div>
              <div className='about-container'>
                <h2>Integrity</h2>
                <img src={core3} className="about-container-img" alt="core3" />
                <p>We are committed to honesty, transparency, and ethical behavior in all aspects of our business, and hold ourselves accountable to the highest standards of professionalism.</p>
              </div>
              <div className='about-container'>
                <h2>Collaboration</h2>
                <img src={core4} className="about-container-img" alt="core4" />
                <p>We believe that collaboration and cooperation are essential to achieving success, and foster a culture of respect, trust, and support among our team members.</p>
              </div>
              <div className='about-container'>
                <h2>Continuous learning</h2>
                <img src={core5} className="about-container-img" alt="core5" />
                <p>We are dedicated to staying ahead of the curve in the fast-paced world of recruitment, and encourage ongoing learning and professional development among our team members.</p>
              </div>
            </center>
          </div>
        </div>
    </div>
  )
}

export default About