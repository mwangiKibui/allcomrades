// react
import React,{useState,useEffect,useRef} from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';

import logo from '../images/logo.png'

const  Header = () => {

    const  [isOpen,setIsOpen] = useState(false);
    const [bgColor,setBgColor] = useState(false);
    const toggle =  () => setIsOpen(!isOpen);

    


    const navRef = useRef();
    navRef.current = bgColor;
    useEffect(() => {
      const handleScroll = () => {
          const show = window.scrollY > 300;
          if(navRef.current !== show){
              setBgColor(show);
          }
      }
      document.addEventListener('scroll',handleScroll);
      return () => {
          document.removeEventListener('scroll',handleScroll);
      }
    },[]);
    return (
        <div>
            <Navbar  style={{
                background:bgColor ? 'white' : 'transparent'
            }}  fixed="top"  dark expand="md">
                <NavbarBrand href="/">
                    <img src={logo} className="navbar_logo" alt="logo" />
                    <span style={{'color':bgColor ? '#000' :'#fff'}}>allcomrades</span>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/market_place" style={{'color':bgColor ? '#000' : '#fff'}}>Market place</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/events" style={{ 'color': bgColor ? '#000' : '#fff' }}>Events</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/posts" style={{ 'color': bgColor ? '#000' : '#fff' }}>Blogs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/hostels" style={{ 'color': bgColor ? '#000' : '#fff' }}>Hostels</NavLink>
                        </NavItem>
                        {/** this one shall be programmatic */}
                        <NavItem>
                            <NavLink href="/account" style={{ 'color': bgColor ? '#000' : '#fff' }}>Dashboard</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )

}

export default Header;