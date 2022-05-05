import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash-button ${isOwn ? 'element__trash-button_visible' : 'element__trash-button_hidden'}`
      );

      const isLiked = card.likes.some(i => i._id === currentUser._id);
      const cardLikeButtonClassName = (
        `element__subtitle-like-button ${isLiked && 'element__subtitle-like-button_active'}`
      );; 

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }    

    return (
        <>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Trash"></button>
            <img className="element__image" src={`${card.link}`} onClick={handleClick} alt={`${card.name}`}/>
            <div className="element__subtitle">
                <h2 className="element__subtitle-text">{card.name}</h2>
                <div className="element__subtitle-like">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Like"></button>
                    <p className="element__subtitle-like-count">{card.likes.length}</p>
                </div>
            </div>
        </>
    );
}

export default Card;