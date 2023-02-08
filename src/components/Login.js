import React, { useState } from "react";

function Login(props) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

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
    props.handleLogin(formValue);
    setFormValue({ password: "", email: "" });
  };

  return (
    <div className="auth-form__container">
      <form
        className="auth-form__form"
        name={"loginForm"}
        onSubmit={handleSubmit}
      >
        <h3 className="auth-form__title">{"Вход"}</h3>
        <input
          id="email-input"
          type="email"
          value={formValue.email || ""}
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
          value={formValue.password || ""}
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
