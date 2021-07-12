import React from 'react';

function Register() {
  return (
    <section className="auth">
      <h2 className="auth__header">Регистрация</h2>
      <form className="auth__form">
        <input 
          className="auth__input" placeholder="Email" type="email"
        />
        <input 
          className="auth__input" placeholder="Пароль" type="password"
        />
        <button className="auth__submit-button">Зарегистрироваться</button>
      </form>
      <span className="auth__caption">Уже зарегистрированы? Войти</span>
    </section>
  );
}

export default Register;