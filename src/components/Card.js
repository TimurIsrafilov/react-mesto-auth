import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `elements__group ${
    isLiked && "elements__group_active"
  }`;

  return (
    <div className="elements__element">
      {isOwn && (
        <div className="elements__trash-icon" onClick={handleDeleteClick}></div>
      )}
      <img
        src={props.link}
        alt={props.name}
        className="elements__mask-group"
        onClick={handleCardClick}
      />
      <div className="elements__container">
        <h2 className="elements__title">{props.name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="поставить нравиться"
            onClick={handleLikeClick}
          ></button>
          <span className="elements__likes-number">{props.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
