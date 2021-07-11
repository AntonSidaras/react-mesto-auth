import logo from "../images/header/logo.svg";
import React from 'react';

function Header({location}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место"/>
      <span className="header__location">{location}</span>
    </header>
  );
}

export default Header;