import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../auth.js";

function Login(props) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValue.password || !formValue.email) {
      return;
    }

    auth.authorize(formValue.email, formValue.password).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);

        
        props.handleLogin();
        navigate("/home"
        // , { replace: true }
        );


        setFormValue({ password: "", email: "" });
        // setFormValue({ email: "", password: "" });
        
      }
    });

    // props
    //   .handleLogin(formValue)
    //   .then(() => {
    //     setFormValue({ password: "", email: "" });
    //   })
    //   .catch((err) => {
    //     console.log(`Ошибка.....: ${err}`);
    //   });

    // props
    //   .handleLogin(formValue)
    //   .then(() => {
    //     setFormValue({ password: "", email: "" });
    //   })
    //   .catch((err) => {
    //     console.log(`Ошибка.....: ${err}`);
    //   });
  };

  return (
    <div className="auth-form__container">
      <form
        className="auth-form__form"
        name={"loginForm"}
        // onSubmit={props.onSubmit}
        onSubmit={handleSubmit}
      >
        <h3 className="auth-form__title">{"Вход"}</h3>
        <input
          id="email-input"
          type="email"
          // value={name || ""}
          value={formValue.email}
          placeholder="Email"
          name="email"
          required
          className="auth-form__input auth-form__input_type_email"
          // minLength="2"
          // maxLength="40"
          // onChange={handleNameChange}
          onChange={handleChange}
        />
        <span className="auth-form__input-error email-input-error"></span>
        <input
          id="password-input"
          type="password"
          // value={description || ""}
          value={formValue.password}
          placeholder="Пароль"
          name="password"
          required
          className="auth-form__input auth-form__input_type_password"
          // minLength="2"
          // maxLength="200"
          // onChange={handleDescriptionChange}
          onChange={handleChange}
        />
        <span className="auth-form__input-error password-input-error"></span>
        <button
          type="submit"
          className="auth-form__submit-button"
          aria-label="Да"
        >
          Войти
        </button>
      </form>
    </div>

    // <div className="login">
    //   <p className="login__welcome">
    //     Добро пожаловать!
    //   </p>
    //   <form onSubmit={handleSubmit} className="login__form">
    //     <label htmlFor="username">
    //       Логин:
    //     </label>
    //     <input required id="username" name="username" type="text" value={formValue.username} onChange={handleChange} />
    //     <label htmlFor="password">
    //       Пароль:
    //     </label>
    //     <input required id="password" name="password" type="password" value={formValue.password} onChange={handleChange} />
    //     <div className="login__button-container">
    //       <button type="submit" className="login__link">Войти</button>
    //     </div>
    //   </form>
    //   <div className="login__signup">
    //     <p>Ещё не зарегистрированы?</p>
    //     <Link to="/register" className="signup__link">Зарегистрироваться</Link>
    //   </div>
    // </div>
  );
}

export default Login;
