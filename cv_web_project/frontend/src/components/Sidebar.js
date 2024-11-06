import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import cv from './img/cv.png';
import './style.css';

const Nav = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  padding:0 1em;
  background: #0F161B;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  position: absolute;
  right: 0.8em;
  margin-left: 2rem;
  font-size: 1.5rem;
  height: 80px;
  display: flex;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #0F161B;
  opacity: 0.97;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "" }}>
        <Nav>
          <h1 id="logo">
            <a href="mailto:b20210020@student.utb.edu.bn">
              <img src={cv} id="webtitle-img" className="webtitle-item" alt="" />
              Curriculum Vitae
            </a>
          </h1>
          <NavIcon to="#">
            <AiIcons.AiOutlineMenu id="openMenu" className="menuBtn" onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose id="closeMenu" className="menuBtn" onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
