import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/formhooks";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import AuthContext from "../../shared/context/AuthContext";
import { useHttp } from "../../shared/hooks/httphooks";
import ImageUpload from "../../shared/components/FormElements/imageUpload";

import "./NewPlace.css";

const NewPlace = () => {
  const Navigate = useNavigate();
  const { Loading, error, sendRequest, errorCancel } = useHttp();
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const handleForm = async (event) => {
    event.preventDefault();
    try {
      
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("descrption", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);

      await sendRequest("http://localhost:5000/api/places", "POST", formData ,{
        'Authorization': 'bearer' + auth.token
      });
      
      
      Navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorCancel} />

      <form className="place-form" onSubmit={handleForm}>
        {Loading && <LoadingSpinner overlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <ImageUpload id="image"  onInput={inputHandler} errorText="Please provide an image." />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
