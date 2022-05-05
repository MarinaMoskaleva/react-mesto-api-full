import React, {useState} from "react";
import { useHistory } from 'react-router-dom'; 
import api from '../utils/Api.js'

function Login({handleLogin, authFall}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function onLogin(e){
        e.preventDefault();
        if (!email || !password){
            return;
        }
        api.login(email, password)
        .then((data)=>{
            if (data.token){
                localStorage.setItem('token', data.token);
                setEmail('');
                setPassword('');
                handleLogin(email, true);
                history.push('/');
            }
        })
        .catch((err)=>{
            authFall();
            console.log(err);
        });
    }
    return (
        <div className='sign'>
            <form className="popup__form" name='login'>
            <h2 className="popup__title popup__title_dark">Вход</h2>
                <label className="popup__form-field">
                <input
                    id="login-email-input"
                    type="text"
                    className="popup__input popup__input_dark"
                    name="login-email"
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
                    id="login-pass-input"
                    type="password"
                    className="popup__input popup__input_dark"
                    name="login-pass"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <span className="url-input-error popup__error"></span>
                </label>
            </form>
            <button className="popup__button popup__button_dark" onClick={onLogin} type="submit">Войти</button>
        </div>
    );
}

export default Login;