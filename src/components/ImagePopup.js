function ImagePopup(props) {
  return (
    <div className={`popup popup_photo ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="popup__mask-group"
        />
        <h2 className="popup__phototitle">
          {props.card ? props.card.name : ""}
        </h2>
        <button
          type="button"
          className="popup__close-icon"
          aria-label="закрыть форму"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
