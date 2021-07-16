import logo from "../images/header/logo.svg";
import React from 'react';
import { Link } from 'react-router-dom';

function Header({data, onSignOut}) {

  const [isViewExtra, setisViewExtra] = React.useState(false);

  function toggleViewExtra(){
    isViewExtra ? setisViewExtra(false) : setisViewExtra(true);
  }

  function handleClick(){
    onSignOut();
  }

  return (
    <header className={`header`}>
      <div className="header__top">{
        isViewExtra === true && data.email !== "" && 
          <span 
            className="header__text header__text_type_email header__text_type_media-min-width-invisible">{data.email}
          </span>
      }{
        isViewExtra === true && data.button !== "" && 
        <button 
          type="button" 
          className="header__text header__text_type_logout header__text_type_media-min-width-invisible" 
          onClick={handleClick}>{data.button}
        </button>
      }
      </div>
      <div className={`header__bottom ${isViewExtra ? "header__bottom_type_media" : ""}`}>
        <img className="header__logo" src={logo} alt="Логотип проекта Место"/>
        <div className="header__data">{
            data.link !== "" && 
            <Link className="header__text header__text_type_link" to={data.link}>{data.text}</Link>
          }{
            data.email !== "" && 
            <span className="header__text header__text_type_media-max-width-invisible">{data.email}</span>
          }{
            data.button !== "" && 
            <button 
              type="button" 
              className="header__text header__text_type_logout header__text_type_media-max-width-invisible"
              onClick={handleClick}>{data.button}
            </button>
          }{
            data.button !== "" && data.email !== "" && 
              <button 
                type="button" 
                className={`header__extra ${isViewExtra ? "header__extra_opened" : ""}`}
                onClick={toggleViewExtra}>
              </button>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;