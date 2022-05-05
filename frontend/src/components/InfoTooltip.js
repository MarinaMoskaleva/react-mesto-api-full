import React from "react";

function InfoTooltip({isOpen, onClose, caption, img}){
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={onClose} type="button" aria-label="Close"></button>
        <img src={img} className='popup__image' alt="Регистрация"/>
        <h2 className="popup__title popup__title_info">{caption}</h2>
      </div>
    </div>
    );
}

export default InfoTooltip;