import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Loader from "./Loader";
import api from "../utils/api";
import ImperativeValidation from "../utils/utils"
import onLoadImage from "../images/profile/Card-load.gif"
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {

  const buttonCaptionDefault = {add: "Создать", delete: "Да", others: "Сохранить"}

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isLoaderVisible, setLoaderVisible] = React.useState(true);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [buttonCaption, setButtonCaption] = React.useState(buttonCaptionDefault);
  const [currentUser, setCurrentUser] = React.useState({name: "Идёт загрузка...", avatar: onLoadImage, about: "", _id: 0});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
    })
    .catch(([userDataError, cardsError]) => {
      alert(userDataError);
      alert(cardsError);
    })
    .finally(()=>{
      setLoaderVisible(false);
      //ImperativeValidation(); старая императивная валидация
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if(isLiked){
      api.dislikeCard(card._id)
      .then((result) => {
        setCards((state) => state.map((c) => c._id === card._id ? result : c));
      })
      .catch((error) => {
        alert(error);
      });
    }
    else{
      api.likeCard(card._id)
      .then((result) => {
        setCards((state) => state.map((c) => c._id === card._id ? result : c));
      })
      .catch((error) => {
        alert(error);
      });
    }
  } 

  function handleCardDelete(card){
    setCardToDelete(card);
  }

  function handleCardClick(card){
    setSelectedCard(card);
  }

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups(){
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  }

  function handleUpdateUser({name, about}){
    setButtonCaption({add: "Создать", delete: "Да", others: "Сохранение..."});
    api.setUserInfo({
      newName: name, 
      newAbout: about
    })
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((error) => {
      alert(error);
    })
    .finally(()=>{
      setButtonCaption(buttonCaptionDefault);
    });
  }

  function handleUpdateAvatar({avatar}){
    setButtonCaption({add: "Создать", delete: "Да", others: "Сохранение..."});
    api.updateAvatar(avatar)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((error) => {
      alert(error);
    })
    .finally(()=>{
      setButtonCaption(buttonCaptionDefault);
    });
  }

  function handleAddPlaceSubmit({title, link}){
    setButtonCaption({add: "Сохранение...", delete: "Да", others: "Сохранить"});
    api.createNewCard({
      newTitle: title,
      newLink: link
    })
    .then((result) => {
      setCards([result, ...cards]);
      closeAllPopups();
    })
    .catch((error) => {
      alert(error);
    })
    .finally(() => {
      setButtonCaption(buttonCaptionDefault);
    });
  }

  function handleDelete(card){
    setButtonCaption({add: "Создать", delete: "Удаление...", others: "Сохранить"});
    api.removeCard(card._id)
    .then(() => {
      setCards((state) => state.filter(c => c._id !== card._id));
      closeAllPopups();
    })
    .catch((error) => {
      alert(error);
    })
    .finally(()=>{
      setButtonCaption(buttonCaptionDefault);
    });
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
          onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
        />
        <Loader isVisible={isLoaderVisible} image={onLoadImage}/>
        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} buttonCaption={buttonCaption}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} buttonCaption={buttonCaption}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} buttonCaption={buttonCaption}/> 
        <DeleteConfirmPopup card={cardToDelete} onClose={closeAllPopups} onDelete={handleDelete} buttonCaption={buttonCaption}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;