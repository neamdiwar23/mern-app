import React, { useState, useContext, useCallback } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../shared/util/validators";
import { AuthContext } from "../../shared/components/context/auth-context";

import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);

    const[formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },

    })

    const onSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, 
            formState.inputs.email.isValid && formState.inputs.password.isValid);
        }
        else{
            setFormData({
                ...formState.inputs,
                name: {
                    value:'',
                    isValid: false
                }

            }, false)
        }

        setIsLoginMode(prevMode => !prevMode);
    }

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr/>
            <form onSubmit={onSubmitHandler}>
                {!isLoginMode && 
                    <Input 
                        id="name"
                        element="input"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name."
                        onInput={inputHandler} 
                    />
                }
                <Input 
                    id="email"
                    element="input"
                    type="email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid username."
                    onInput={inputHandler} 
                />
                <Input 
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid password."
                    onInput={inputHandler} 
                />
                <Button type="submit" disabled={!formState.isValid}>{isLoginMode? 'LOGIN' : 'SIGNUP'}</Button>   
            </form>
            <Button inverse onClick={switchModeHandler}>{isLoginMode? 'SIGNUP' : 'LOGIN'}</Button>
        </Card>

    )    

}

export default Auth;