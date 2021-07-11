import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
          <div className="profile__avatar-overlay"></div>
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
        ))}
      </section>
    </main>
    
  );
}

export default Main;