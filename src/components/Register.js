import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../auth.js";

function Register(props) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  function handleLoginInfoOpen() {
    props.loginInfoMessage();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValue.password || formValue.email) {
      auth
        .register(formValue.email, formValue.password)
        .then((res) => {
          setFormValue({ password: "", email: "" });
          navigate("/sign-in", { replace: true });
          handleLoginInfoOpen();
          props.setRegisteredIn(true);
        })
        .catch((err) => {
          handleLoginInfoOpen();
          props.setRegisteredIn(false);
          console.log(`Ошибка.....: ${err}`);
        });
    }
  };

  return (
    <div className="auth-form__container">
      <form
        className="auth-form__form"
        name={"registerForm"}
        onSubmit={handleSubmit}
      >
        <h3 className="auth-form__title">{"Регистрация"}</h3>
        <input
          id="email-input"
          type="email"
          value={formValue.email}
          placeholder="Email"
          name="email"
          required
          className="auth-form__input auth-form__input_type_email"
          // minLength="2"
          // maxLength="40"

          onChange={handleChange}
        />
        <span className="auth-form__input-error email-input-error"></span>
        <input
          id="password-input"
          type="password"
          value={formValue.password}
          placeholder="Пароль"
          name="password"
          required
          className="auth-form__input auth-form__input_type_password"
          // minLength="2"
          // maxLength="200"

          onChange={handleChange}
        />
        <span className="auth-form__input-error password-input-error"></span>
        <button
          type="submit"
          className="auth-form__submit-button"
          aria-label="Да"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="auth-form__note-container">
        <p className="auth-form__note">{"Уже зарегистрированы?"}</p>
        <Link to="/sign-in" className="auth-form__link">
          {"Войти"}
        </Link>
      </div>
    </div>
  );
}

export default Register;
