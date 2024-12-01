import React, { useState } from "react";

import Card from "../../shared/components/UIElement/Card.js";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators.js";
import { useForm } from "../../shared/hooks/formhooks.js";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setisLogin] = useState(false);

  const [formState, inputHandler , setData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const signupHandler = () => {

    if(isLogin){
        setData(
            {
                ...formState.inputs,
                name: undefined,
            },
            formState.inputs.email.isValid && formState.inputs.password.isValid
        )
    }
    else{
        setData(
            {
                ...formState.inputs,
                name:{
                    value:"",
                    isValid: false,
                }
            },
            false
        )
    }


    setisLogin((prev) => !prev);
  };

  return (
    <Card className="authentication">
      <h2>{isLogin ? "SINGUP" : "LOGIN"} Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {isLogin && (
          <Input
            element="input"
            id="name"
            type="name"
            label="Your name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid} >
        {isLogin ? "SINGUP" : "LOGIN"}
        </Button>
      </form>

      <Button inverse onClick={signupHandler}>
        Switch To {isLogin ? "Login" : "Signup"}
      </Button>
    </Card>
  );
};

export default Auth;
