import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__profile-container">
          <img
            src={currentUser.avatar}
            alt="Аватарка"
            className="profile__avatar"
          />
          <img
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          />
          <div className="profile__profile-info">
            <div className="profile__profile-info-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="редактировать профиль"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="добавить элемент"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            name={card.name}
            link={card.link}
            likes={card.likes}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
