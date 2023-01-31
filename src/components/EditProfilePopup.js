import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        type="text"
        value={name || ""}
        placeholder="Имя"
        name="name"
        required
        className="popup__input popup__input_type_name"
        // minLength="2"
        // maxLength="40"
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="profession-input"
        type="text"
        value={description || ""}
        placeholder="Профессия"
        name="profession"
        required
        className="popup__input popup__input_type_profession"
        // minLength="2"
        // maxLength="200"
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error profession-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
