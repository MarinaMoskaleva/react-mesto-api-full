import React, { useState } from "react";
import { Link } from 'react-router-dom'; 


function Register({onRegSubmit}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        if (!email || !password){
            return;
        }
        onRegSubmit(email, password);
    }
    return (
        <div className='sign'>
            <form className="popup__form" name='login'>
            <h2 className="popup__title popup__title_dark">Регистрация</h2>
                <label className="popup__form-field">
                <input
                    id="register-email-input"
                    type="text"
                    className="popup__input popup__input_dark"
                    name="register-email"
                    required
                    placeholder="Email"
                    minLength="2"
                    maxLength="30"
                    value={email}
                    onChange={handleEmailChange}
                />
                <span className="title-input-error popup__error"></span>
                </label>
                <label className="popup__form-field">
                <input
                    id="register-pass-input"
                    type="password"
                    className="popup__input popup__input_dark"
                    name="register-pass"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <span className="url-input-error popup__error"></span>
                </label>
            </form>
            <button className="popup__button popup__button_dark" onClick={handleSubmit} type="submit">Зарегистрироваться</button>
            <div className="sign__caption">
                <p className="sign__caption-text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="sign__caption-link">Войти</Link>
            </div>
            
        </div>
    );
}

export default Register;