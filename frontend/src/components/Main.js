import React from 'react';
import EditIcoPath from '../images/EditIco.svg';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);
    
    return (
       <main className="content">
            <section className="profile">
                <div className="profile__current">
                    <img alt="Аватар" className="profile__avatar" src={`${currentUser.avatar}`}/>
                    <div className="profile__avatar-edit" onClick={onEditAvatar}>
                        <img src={EditIcoPath} alt="Иконка" className="profile__avatar-edit-ico"/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__info-name">
                            <h1 className="profile__info-name-current">{currentUser.name}</h1>
                            <button className="profile__info-edit-button" onClick={onEditProfile} type="button" aria-label="Edit"></button>
                        </div>
                        <p className="profile__info-description">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} aria-label="Add"></button>
            </section>
            <section className="elements">
                {cards.map((item) => (
                    <div className="element" key={item._id}>
                        <Card card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Main;