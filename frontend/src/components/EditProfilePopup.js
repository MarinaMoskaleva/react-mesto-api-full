import React,{ useState, useContext, useEffect }  from "react";
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleDescChange(e){
        setDesc(e.target.value);
    }
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setDesc(currentUser.about);
    },[currentUser, isOpen]);

    function handleSubmit(e){
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <label className="popup__form-field">
            <input
                  id="name-input"
                  type="text"
                  className="popup__input popup__input_type_name"
                  name="name-input"
                  required
                  placeholder="Введите имя"
                  minLength="2"
                  maxLength="40"
                  value={name}
                  onChange={handleNameChange}/>
            <span className="name-input-error popup__error"></span>
            </label>
            <label className="popup__form-field">
              <input
                  id="description-input"
                  type="text"
                  className="popup__input popup__input_type_description"
                  name="description-input"
                  required
                  placeholder="Введите описание"
                  minLength="2"
                  maxLength="200"
                  value={description}
                  onChange={handleDescChange}/>
              <span className="description-input-error popup__error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;