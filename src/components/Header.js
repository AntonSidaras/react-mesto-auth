import logo from "../images/header/logo.svg";
import React from 'react';
import { Link } from 'react-router-dom';

function Header({data, onLogout}) {

  const [isViewExtra, setisViewExtra] = React.useState(false);

  function toggleViewExtra(){
    isViewExtra ? setisViewExtra(false) : setisViewExtra(true);
  }

  function handleClick(){
    onLogout();
  }

  //разбить на два div верхний оставить по isView

  return (
    <header className={`header`}>
      <img className="header__logo" src={logo} alt="Логотип проекта Место"/>
      <div className="header__data">{
          data.link !== "" && <Link className="header__text header__text_type_link" to={data.link}>{data.text}</Link>
        }{
          data.email !== "" && <span className="header__text header__text_type_email">{data.email}</span>
        }{
          data.button !== "" && <button type="button" className="header__text header__text_type_logout" onClick={handleClick}>{data.button}</button>
        }{
          data.button !== "" && data.email !== "" && 
            <button 
              type="button" 
              className={`header__extra ${isViewExtra ? "header__extra_opened" : ""}`}
              onClick={toggleViewExtra}>
            </button>
        }
      </div>
    </header>
  );
}

export default Header;