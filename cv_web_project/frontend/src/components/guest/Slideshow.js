import React, { useState, useEffect } from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import axios from 'axios';
import '../../style.css';

const Slideshow = () => {
    const [slideshowlist, setSlideshowlist] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get('http://127.0.0.1:5000/api/showslideshowlist');
            setSlideshowlist(res.data);
        }
        fetchData();
    }, []);

    return (
        <div className="slide-container">
            <Zoom scale={0.4}>
                {
                    slideshowlist.map((each, index) => <img key={index} style={{ width: "100%", height: "450px" }} src={each.imageUrl} alt={each.caption}/>)
                }
            </Zoom>
        </div>
    )
}

export default Slideshow