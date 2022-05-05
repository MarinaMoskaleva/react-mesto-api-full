import React from "react";

function PopupWithForm(props){
  const {name, title, isOpen, onClose, buttonText='Сохранить', onSubmit} = props;
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={onClose} type="button" aria-label="Close"></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`${name}`}>
          {props.children}
          <button className="popup__button" onClick={onSubmit} type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;