import React from 'react';

function Login() {
  return (
    <section className="auth">
      <h2 className="auth__header">Вход</h2>
      <form className="auth__form">
        <input 
          className="auth__input" placeholder="Email" type="email"
        />
        <input 
          className="auth__input" placeholder="Пароль" type="password"
        />
        <button className="auth__submit-button">Войти</button>
      </form>
    </section>
  );
}

export default Login;