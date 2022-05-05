import React from "react";

function ImagePopup({card, onClose}){
    return (
        <div className={`popup popup-image ${card && 'popup_opened'}`}>
            <form className="popup-image__container">
                <button className="popup__close-button" type="button" aria-label="Close" onClick={onClose}></button>
                <img className="popup-image__image" src={`${card ? card.link : '#'}`} alt={`${card ? card.name : ''}`}/>
                <p className="popup-image__caption">{card ? card.name : ''}</p>
            </form>
        </div>
    );
}

export default ImagePopup;