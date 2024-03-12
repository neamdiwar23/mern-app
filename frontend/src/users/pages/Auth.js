import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

import './Auth.css';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Auth = () => {
    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(true);
     const {isLoading, error, sendRequest, clearError} = useHttpClient();

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

    const onSubmitHandler = async event =>{
        event.preventDefault();       
        
        if (isLoginMode){
            try{
                const responseData = await sendRequest('http://localhost:5000/api/users/login',
                    'POST',                    
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    },
                );
                 
                auth.login(responseData.user.id);

            }catch(err){
               // console.log(err);
            }

        }else {
            try{
                const responseData = await sendRequest('http://localhost:5000/api/users/signup',
                    'POST',                    
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    },
                );
                 
                auth.login(responseData.user.id);

            }catch(err){
               // console.log(err);
            }
        }

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
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay/> }
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
        </React.Fragment>

    )    

}

export default Auth;