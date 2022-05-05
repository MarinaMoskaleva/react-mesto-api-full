import React,{ useState, useEffect } from 'react';
import Header from './Header.js'
import MainPage from './MainPage.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import { Route, Switch, useHistory } from 'react-router-dom'
import Register from './Register.js'
import Login from './Login.js'
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import regDone from '../images/regDone.svg'
import regFall from '../images/regFall.svg'


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name:'', about:'', avatar:''});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [dataInfoTooltip, setDataInfoTooltip] = useState({ text: '', image: '' });
  const history = useHistory();

  function tokenCheck () {
    const jwt = localStorage.getItem('token');
    if (jwt){
      api.getContent(jwt)
      .then((res) => {
        if (res){
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  }
  
  useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cardsData])=>{
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err)=>{
      console.log(err);
    });

    tokenCheck();
  },[]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(currentUser) {
    api.patchUserData(currentUser)
        .then((data)=>{
          setCurrentUser(data);
          closeAllPopups();
        })
        .catch((err)=>{
            console.log(err);
        });
  }

  function handleUpdateAvatar(currentUser) {
    api.patchAvatar(currentUser.avatar)
        .then((data)=>{
          setCurrentUser(data);
          closeAllPopups();
        })
        .catch((err)=>{
            console.log(err);
        });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err)=>{
        console.log(err);
    });
  }

  function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
          setCards(cards.filter(item => item._id !== card._id))
      })
      .catch((err)=>{
          console.log(err);
      });
  }

  function handleAddPlaceSubmit(cadr) {
    api.postNewCard(cadr)
        .then((data)=>{
          setCards([data, ...cards]);
          closeAllPopups();
        })
        .catch((err)=>{
            console.log(err);
        });
  }

  function authFall() {
    setInfoTooltipOpen(true);
    setDataInfoTooltip({ text: 'Что-то пошло не так! Попробуйте ещё раз', image: regFall });
  }

  function handleRegSubmit(email, password) {
    api.register(email, password)
        .then((data)=>{
          setInfoTooltipOpen(true);
          setDataInfoTooltip({ text: 'Вы успешно зарегистрировались', image: regDone });
          history.push('/sign-in');
        })
        .catch((err)=>{
          console.log(err);
          setInfoTooltipOpen(true);
          setDataInfoTooltip({ text: 'Что-то пошло не так! Попробуйте ещё раз', image: regFall });
        });
  }

  function handleLogin(email, logState) {
    setLoggedIn(logState);
    setEmail(email);
  }

  return (
    <div className='root'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/sign-up">
            <Header text='Войти' link='/sign-in'/>
            <Register onRegSubmit={handleRegSubmit}/>
          </Route>
          <Route path="/sign-in">
            <Header text='Регистрация' link='/sign-up'/>
            <Login handleLogin={handleLogin} authFall={authFall}/>
          </Route>
          <ProtectedRoute 
              path="/" 
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              cards={cards} 
              onCardLike={handleCardLike} 
              onCardDelete={handleCardDelete} 
              email={email}
              handleLogin={handleLogin}
              component={MainPage}
          />
        </Switch>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText='Создать' onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <PopupWithForm name='delete-place' title='Вы уверены?'>
          <button className="popup__close-button" type="button" aria-label="Close"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="popup__button" type="submit">Да</button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} caption={dataInfoTooltip.text} img={dataInfoTooltip.image}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
