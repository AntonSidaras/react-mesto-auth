import logo from "../images/header/logo.svg";
import React from 'react';
import { Link } from 'react-router-dom';

function Header({data}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место"/>
      <div className="header__data">
        {
          data.caption !== "" && <span className="header__text">{data.caption}</span>
        }
        {
          data.link !== "" && <Link className="header__text header__text_type_link" to={data.link}>{data.text}</Link>
        }
        {
          data.button !== "" && <button type="button" className="header__text header__text_type_logout">{data.button}</button>
        }
      </div>
    </header>
  );
}

export default Header;