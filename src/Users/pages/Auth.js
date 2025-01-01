import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElement/Card.js";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators.js";
import { useForm } from "../../shared/hooks/formhooks.js";
import AuthContext from "../../shared/context/AuthContext.js";
import { useHttp } from "../../shared/hooks/httphooks.js";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner.js";
import ErrorModal from "../../shared/components/UIElement/ErrorModal.js";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setisLogin] = useState(true);
  const { Loading, sendRequest, error, errorCancel } = useHttp();
  const [formState, inputHandler, setData] = useForm(
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

  const signupHandler = () => {
    if (isLogin) {
      setData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setisLogin((prev) => !prev);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        );
        auth.login(responseData.user.id);
      } catch (e) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        );
        auth.login(responseData.user.id);
      } catch (e) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorCancel} />

      <Card className="authentication">
        {Loading && <LoadingSpinner overlay />}
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
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "SINGUP" : "LOGIN"}
          </Button>
        </form>

        <Button inverse onClick={signupHandler}>
          Switch To {isLogin ? "Login" : "Signup"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
