import React, { useState , useContext } from "react";

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
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner.js";
import ErrorModal from "../../shared/components/UIElement/ErrorModal.js";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext)
  const [isLogin, setisLogin] = useState(true);
  const [isLoading , setisLoading] = useState(false)
  const [isError , setisError]= useState()

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
  const authSubmitHandler = async(event) => {
    event.preventDefault();
    setisLoading(true)
    setisError(null)
    
    if(!isLogin){

      try{
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        })
        
        const responseData = await  response.json();
        if(!response.ok){
          throw new Error(responseData.message)
        }
        auth.login();
      }
      catch(e){
        setisError(e.message || "Something went worng please try again later")
      }
      
    }else{
      try{
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        })

        
        const responseData = await  response.json();
        
        if(!response.ok){
          throw new Error(responseData.message)
        }
        auth.login();
      }
      catch(e){
        setisError(e.message || "Something went worng please try again later")
      }
    }
    setisLoading(false)


  };

  const errorCancel = ()=>{
    setisError(null)
  }


  return (

    <>

    <ErrorModal error ={isError} onClear={errorCancel}/>

    <Card className="authentication">
      {isLoading && <LoadingSpinner overlay/>}
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
          </>
  );
};

export default Auth;
