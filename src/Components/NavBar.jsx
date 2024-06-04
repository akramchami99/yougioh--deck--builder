// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import YugiohLogo from '../Photos/Yu-Gi-Oh.png'
import '../Styles/NavBar.css'

const Navbar = () => {
  return (
    <nav>
        <img src={YugiohLogo} alt='yougioh-logo'/>
        <Link to="/" className='nav--links'>Home</Link>
        <Link to="/deck" className='nav--links'>My Deck</Link>
    </nav>
  );
};

export default Navbar;
