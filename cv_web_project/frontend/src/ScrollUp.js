import React, {useState} from 'react';
import * as BsIcons from "react-icons/bs";
import './style.css';

const ScrollUp = () =>{

  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 150){
      setVisible(true)
    }
    else if (scrolled <= 150){
      setVisible(false)
    }
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className="scrollTop" type="button" onClick={scrollToTop}  style={{display: visible ? 'inline' : 'none'}} >
     <BsIcons.BsChevronDoubleUp/>
    </div>
  );
}

export default ScrollUp;
