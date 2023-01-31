import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const inputNameRef = React.useRef(null);
  const inputLinkRef = React.useRef(null);

  function handlePlaceChange(e) {
    inputNameRef.value = e.target.value;
  }

  function handleReferenceChange(e) {
    inputLinkRef.value = e.target.value;
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value,
    });
  }

  React.useEffect(() => {
    inputNameRef.current.value = "";
    inputLinkRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        type="text"
        placeholder="Название"
        name="place"
        required
        className="popup__input popup__input_type_place"
        // minLength="2"
        // maxLength="30"
        ref={inputNameRef}
        onChange={handlePlaceChange}
      />
      <span className="popup__input-error place-input-error"></span>
      <input
        id="reference-input"
        type="url"
        placeholder="Ссылка на картинку"
        name="reference"
        required
        className="popup__input popup__input_type_reference"
        ref={inputLinkRef}
        onChange={handleReferenceChange}
      />
      <span className="popup__input-error reference-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
