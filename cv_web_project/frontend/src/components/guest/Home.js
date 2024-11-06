import why1 from '../../img/why1.png';
import why2 from '../../img/why2.png';
import why3 from '../../img/why3.png';

import connect from '../../img/connect.png';
import learn from '../../img/learn.png';

import { InlineIcon } from '@iconify/react';
import { Dropdown, Option } from "../Dropdown";
import React from 'react';
import Slideshow from './Slideshow';
import '../../style.css';

const Home = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

  return (
    <div>
      <div id="webtitle">
        <h1 className="webtitle-item">Welcome to Home Dashboard!</h1>
        <p>{today}</p>
        <div className="wave"></div>
      </div>

      <div className="card">
        <div className="slide-container">
          <Slideshow></Slideshow>
        </div>
      </div>

      <div className="card" id="home-container-reason">
        <h1 className='title-h1'><InlineIcon icon="mdi:frequently-asked-questions" /> Why companies choose CVSeekerBN?</h1>
        <div className="card-container">
          <div className="companies-reasons">
            <h2>We’re Jobseekers’ 1st Choice</h2>
            <img src={why1} className="companies-reasons-img" alt="why1" />
            <p>Access to 100+ thousand talent in Brunei Darussalam*</p>
          </div>

          <div className="companies-reasons">
            <h2>We’re Trusted</h2>
            <img src={why2} className="companies-reasons-img" alt="why2" />
            <p>Trusted by 1+ million companies in Asia</p>
          </div>

          <div className="companies-reasons">
            <h2>We’ve Got You</h2>
            <img src={why3} className="companies-reasons-img" alt="why3" />
            <p>Our Account Managers are always ready to help</p>
          </div>

          <p className='companies-reasons-p'>*Based on CVSeeker and Employer Market Survey 2022 & 2023 by a third-party research agency.</p>
        </div>
      </div>

      <div className="card" id="home-container-other">
        <div className="learn-section">
          <img src={connect} className="learn-section-img" id="learn-section-img-part1" alt="learn" />
          <h1>Connect with people who can help</h1>
          <button id='home-other' className='button'>Find people you know</button>
        </div>
        <div className="learn-section">
          <img src={learn} className="learn-section-img" id="learn-section-img-part2" alt="connect" />
          <h1>Learn the skills you need to succeed</h1>
          <Dropdown buttonText="Send form" action="/">
            <Option selected value="Choose a topic to learn about" />
            <Option value="Web Developer" />
            <Option value="Web Designer" />
            <Option value="Mobile Developer" />
          </Dropdown>
        </div>
      </div>

    </div>
  )
}

export default Home