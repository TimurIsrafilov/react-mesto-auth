import logo from "../images/logo.svg";
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    props.handleLogout();
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="Лого" src={logo} />
        <div className="header__login-info">
          <h2 className="header__login-email">
            {props.loggedIn
              ? 
              // "1"
              props.userData
              :
                ""}
          </h2>
          <h2 className="header__login-status">
            <Routes>
              <Route
                path="/sign-up"
                element={
                  <Link to="/sign-in" className="header__login-status">
                    {"Войти"}
                  </Link>
                }
              />
              <Route
                path="/sign-in"
                element={
                  <Link to="/sign-up" className="header__login-status">
                    {"Регистрация"}
                  </Link>
                }
              />
              <Route
                path="/home"
                element={
                  <button
                    onClick={signOut}
                    className="header__login-status"
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
