import React from 'react';

function Login({onLoginSuccess, onLogin}) {

  function handleSubmit(event){
    event.preventDefault()
    onLogin();
  }
  
  return (
    <section className="auth">
      <h2 className="auth__header">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
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