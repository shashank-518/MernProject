import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/Utils/validators";

import "./NewPlace.css";
import { useForm } from "../../shared/hooks/formhooks";
import { useHttp } from "../../shared/hooks/httphooks";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";

const UpdatePlace = () => {
  const [UpdateData, setUpdateData] = useState();
  const selectedid = useParams().placesid;

  const { Loading, error, sendRequest, errorCancel } = useHttp();

  const [formState, inputHandler, setData] = useForm(
    {
      title: {
        value: " ",
        isvalid: false,
      },
      descrption: {
        value: " ",
        isvalid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${selectedid}`
        );

        setUpdateData(responseData.place);

        setData(
          {
            title: {
              value: responseData.place.title,
              isvalid: true,
            },
            descrption: {
              value: responseData.place.descrption,
              isvalid: true,
            },
          },
          true
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchPlace();
  }, [sendRequest, setData, selectedid]);

  const placeUpdateSubmitForm = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${selectedid}`,
        "PATCH",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          descrption: formState.inputs.descrption.value,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  if (!UpdateData && !error) {
    return (
      <div className="center">
        <Card>
          <h2>No element was found</h2>
        </Card>
      </div>
    );
  }

  if (Loading) {
    return <div>{Loading && <LoadingSpinner overlay />}</div>;
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorCancel} />

      {!Loading && UpdateData && <form className="place-form" onSubmit={placeUpdateSubmitForm}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Enter the Correct Input Value"
          onInput={inputHandler}
          value={UpdateData.title}
          valid={true}
        />

        <Input
          id="descrption"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Enter the Correct Input Value"
          onInput={inputHandler}
          value={UpdateData.descrption}
          valid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update Place
        </Button>
      </form>}
    </>
  );
};

export default UpdatePlace;
