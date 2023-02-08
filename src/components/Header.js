import logo from "../images/logo.svg";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  function signOut() {
    props.handleLogout();
  }

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="Лого" src={logo} />
        <div className="header__login-info">
          <h2 className="header__login-email">
            {props.loggedIn ? props.userData : ""}
          </h2>
          <h2 className="header__login-status">
            <Routes>
              <Route
                path="/sign-up"
                element={
                  <Link to="/sign-in" className="header__login-status-text">
                    {"Войти"}
                  </Link>
                }
              />
              <Route
                path="/sign-in"
                element={
                  <Link to="/sign-up" className="header__login-status-text">
                    {"Регистрация"}
                  </Link>
                }
              />
              <Route
                path="/home"
                element={
                  <button
                    onClick={signOut}
                    className="header__login-status-button"
                  >
                    {"Выйти"}
                  </button>
                }
              />
            </Routes>
          </h2>
        </div>
      </div>
    </header>
  );
}

export default Header;
