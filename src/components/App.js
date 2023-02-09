import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");

  const [loginInfoPopupOpen, setLoginInfoPopupOpen] = useState(false);
  const [registeredIn, setRegisteredIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleLogin = (formValue) => {
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          setUserData(formValue.email, formValue.password);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        handleLoginInfoPopupOpen();
        setLoggedIn(false);
        console.log(`Ошибка.....: ${err}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  const handleRegister = (formValue) => {
    auth
      .register(formValue.email, formValue.password)
      .then((res) => {
        navigate("/sign-in", { replace: true });
        handleLoginInfoPopupOpen();
        setRegisteredIn(true);
      })
      .catch((err) => {
        handleLoginInfoPopupOpen();
        setRegisteredIn(false);
        console.log(`Ошибка.....: ${err}`);
      });
  };

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserData(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка.....: ${err}`);
        });
    }
  };

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.name, data.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleUpdateUser(user) {
    api
      .editProfileInfo(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleUpdateAvatar(user) {
    api
      .updateAvatar(user.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleLoginInfoPopupOpen() {
    setLoginInfoPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setLoginInfoPopupOpen(false);
    setRegisteredIn(false);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            loggedIn={loggedIn}
            userData={userData}
            handleLogout={handleLogout}
          />
          <InfoTooltip
            isOpen={loginInfoPopupOpen}
            onClose={closeAllPopups}
            name="login-info"
            registeredIn={registeredIn}
          />
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-up" replace />
                )
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm name="confirmation" title="Вы уверены?">
            <button
              type="submit"
              className="popup__submit-button"
              aria-label="согласен"
            >
              Да
            </button>
          </PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
