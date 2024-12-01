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
const DUMMY_VALUES = [
  {
    id: "p1",
    title: "Burj Khalifa",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfKNUZIfC9qe-Vz5SkVWSpPhDONel-ek-A&s",
    address:
      "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    descrption:
      "The Burj Khalifa is a skyscraper in Dubai, United Arab Emirates. It is the worlds tallest structure.",
    location: {
      lat: 25.197197,
      long: 55.2743764,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Burj... Khalifa",
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8yfKNUZIfC9qe-Vz5SkVWSpPhDONel-ek-A&s",
    address:
      "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    descrption:
      "The Burj Khalifa is a skyscraper in Dubai, United Arab Emirates. It is the worlds tallest structure.",
    location: {
      lat: 25.197197,
      long: 55.2743764,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const [isLoading, setisLoading] = useState(true);


  const selectedid = useParams().placesid;

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

  const finalValue = DUMMY_VALUES.find((place) => place.id === selectedid);

  console.log(finalValue)

 
    useEffect(() => {

      if(finalValue){

        setData(
          {
            title: {
              value: finalValue.title,
              isvalid: true,
            },
            descrption: {
              value: finalValue.descrption,
              isvalid: true,
            }
          },
          true
        );
      }
      setisLoading(false);
    }, [setData, finalValue]);

  
  


  const placeUpdateSubmitForm = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!finalValue) {
    return (
      <div className="center" >
      <Card>
        <h2>No element was found</h2>
      </Card>
      </div>
      
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2>Loading.....</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitForm}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter the Correct Input Value"
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isvalid}
      />

      <Input
        id="descrption"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Enter the Correct Input Value"
        onInput={inputHandler}
        value={formState.inputs.descrption.value}
        valid={formState.inputs.descrption.isvalid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
