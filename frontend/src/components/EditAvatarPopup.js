import React,{ useRef}  from "react";
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    function handleSubmit(e){
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm name='edit-avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <label className="popup__form-field">
            <input
                  id="avatar-input"
                  type="url"
                  className="popup__input popup__input_type_url"
                  name="popup-avatar-url"
                  required
                  ref={avatarRef}
                  placeholder="Ссылка на аватар"/>
            <span className="avatar-input-error popup__error"></span>
          </label>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;