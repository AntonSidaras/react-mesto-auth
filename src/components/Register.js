import React from 'react';
import { Link } from 'react-router-dom';

function handleSubmit(event){
  event.preventDefault()
}

function Register() {
  return (
    <section className="auth">
      <h2 className="auth__header">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input 
          className="auth__input" placeholder="Email" type="email"
        />
        <input 
          className="auth__input" placeholder="Пароль" type="password"
        />
        <button className="auth__submit-button">Зарегистрироваться</button>
      </form>
      <span className="auth__caption">
        Уже зарегистрированы?&ensp;
        <Link className="auth__caption auth__caption_type_link" to="/sign-in">
          Войти
        </Link>
      </span>
    </section>
  );
}

export default Register;