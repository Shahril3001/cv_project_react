import { Link } from 'react-router-dom'
import React, { useState } from "react";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import logo from '../../img/logo.png';
import '../../style.css';

const Nav = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  padding:0 1em;
  background: #0A2647;
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

const AdminHeader = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const content = (
        <header>
            <>
                <IconContext.Provider value={{ color: "" }}>
                    <Nav>
                        <h1 id="logo">
                            <Link to="/admin">
                                <img src={logo} style={{ width: '175px' }} alt="logo" />
                            </Link>
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
        </header>
    )

    return content
}
export default AdminHeader