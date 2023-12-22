

import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  padding: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const NavTitle = styled.h1`
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavTitle>Your Mobile Shop</NavTitle>
      <NavLinks>
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
