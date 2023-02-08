import ok from "../images/ok.svg";
import notok from "../images/notok.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup__${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <form className="popup__form">
          <div className="popup__login-info-container">
            <div className="popup__symbol-container">
              {props.registeredIn ? (
                <img src={ok} alt="Успешно" className="popup__symbol" />
              ) : (
                <img src={notok} alt="Ошибка" className="popup__symbol" />
              )}
            </div>
            <h3 className="popup__title">
              {props.registeredIn
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз.!"}
            </h3>
          </div>
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

export default InfoTooltip;
