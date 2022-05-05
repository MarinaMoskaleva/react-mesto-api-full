import React,{ useState, useEffect }  from "react";
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup({isOpen, onClose, buttonText, onAddPlace}) {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    function handleTitleChange(e){
        setTitle(e.target.value);
    }
    function handleUrlChange(e){
        setUrl(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        onAddPlace({
            name: title,
            link: url,
        });
    }

    useEffect(() => {
        setTitle('');
        setUrl('');
    },[isOpen]);
    
    return (
        <PopupWithForm name='add-place' title='Новое место' isOpen={isOpen} onClose={onClose} buttonText={buttonText} onSubmit={handleSubmit}>
          <label className="popup__form-field">
            <input
                  id="title-input"
                  type="text"
                  className="popup__input popup__input_type_title"
                  name="popup-add-name"
                  required
                  placeholder="Название"
                  minLength="2"
                  maxLength="30"
                  value={title}
                  onChange={handleTitleChange}/>
            <span className="title-input-error popup__error"></span>
            </label>
            <label className="popup__form-field">
              <input
                  id="url-input"
                  type="url"
                  className="popup__input popup__input_type_url"
                  name="popup-add-url"
                  required
                  placeholder="Ссылка на картинку"
                  value={url}
                  onChange={handleUrlChange}/>
              <span className="url-input-error popup__error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;