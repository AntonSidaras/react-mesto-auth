import React from 'react';
import Auth from '../utils/auth';

function Login({onLoginFail, onLogin}) {

  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleSubmit(event){
    event.preventDefault();

    Auth.signIn({
      email: emailRef.current.value, 
      password: passwordRef.current.value
    })
    .then((response) => {
      console.log(response.token);
      localStorage.setItem('token', response.token);
      onLogin();
    })
    .catch((error) => {
      console.log(error);
      onLoginFail();
    });
  }
  
  return (
    <section className="auth">
      <h2 className="auth__header">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input 
          className="auth__input" placeholder="Email" type="email" ref={emailRef}
        />
        <input 
          className="auth__input" placeholder="Пароль" type="password" ref={passwordRef}
        />
        <button className="auth__submit-button">Войти</button>
      </form>
    </section>
  );
}

export default Login;