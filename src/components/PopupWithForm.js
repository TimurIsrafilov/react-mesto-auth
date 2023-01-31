function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <form
          className="popup__form"
          name={`${props.name}Form`}
          onSubmit={props.onSubmit}
        >
          <h3 className="popup__title">{`${props.title}`}</h3>
          {props.children}
          <button
            type="submit"
            className="popup__submit-button"
            aria-label="Да"
          >
            Отправить
          </button>
        </form>
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

export default PopupWithForm;
