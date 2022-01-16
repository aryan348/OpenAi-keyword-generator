import { useState,  useEffect } from "react";
import React from 'react';
import { Auth } from "aws-amplify";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import '../configureamplify';
import Signin from '../components/Signin';
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";
import ForgotPasswordSubmit from "../components/FotgotPasswordSubmit";
import ConfirmSignUp from "../components/ConfirmSignup"
import FotgotPassword from "../components/ForgotPassword";

const initialState = {email:'',password:'', authCode:''}

const Profile: React.FC = () => { 
    const [authState, setAuthState] = React.useState<AuthState>();
    const [uiState, setUiState] = React.useState("")
    const [formState, setformState] = React.useState(initialState)
    const [user, setUser] = React.useState<object | undefined>();

    const {email, password, authCode} = formState

    React.useEffect(() => {
        chechUser()
    }, []);
    async function chechUser() {
        try{
            const user = await Auth.currentAuthenticatedUser()
            console.log({user})
            setUser(user)
            setUiState('signedIn')
        }catch(err){
            setUser(undefined)
            setUiState('signIn')
        }
    }
    const onChange = (e) => {
        setformState({...formState, [e.target.name]:e.target.value})
    }
    async function signUp() {
        try{
            await Auth.signUp({
                username: email, password, attributes: {email}
            })
            setUiState('confirmSignUp')
        }catch(err){
            console.log({err})
        }
    }
    async function ConfirmSignUp() {
        try{
            await Auth.confirmSignUp(email, authCode)
            setUiState('signedIn')
            signIn()
        }catch(err){
            console.log({err})
        }
    }
    async function signIn() {
        try{
            await Auth.signIn(email,password)
            setUiState('signedIn')
        }catch(err){
            console.log({err})
        }
    }
    async function forgotPassword() {
        try{

        }catch(err){
            console.log({err})
        }
    }
    async function forgotPasswordSubmit() {
        try{

        }catch(err){
            console.log({err})
        }
    }
    return (
        <div className="bg-gray-50 min-h-screen " >
            <div className="flex flex-col items-center">
                <div className="max-w-full sm:w-540 mt-14">
                    <div className="bg-white py-14 px-16 shadow-form rounded">
                        {
                            uiState === 'signUp' && (
                                <Signup onChange={onChange} setUiState={setUiState} signUp={signUp} />
                            )
                        }
                        {
                            uiState === 'confirmSignUp' && (
                                <ConfirmSignUp />
                            )
                        }
                        {
                            // <AmplifyAuthenticator />
                            uiState === 'signIn' && (
                                <Signin 
                                    onChange={onChange}
                                    setUiState={setUiState} signIn={signIn}  />
                            )
                        }
                        {
                            uiState === 'signedIn' &&  (
                                <div>
                                    <div>Hello, {user.attributes.email}</div>
                                    {/* <AmplifySignOut /> */}
                                    <button 
                                        className="text-white w-full mt-10 bg-pink-600 p-3 rounded "
                                        onClick={() => {
                                        Auth.signOut()
                                        setUiState("signIn")
                                        setUser(undefined)
                                        }}>Signout</button>
                                </div>
                            )
                        }
                        {
                            uiState === 'forgotPassword' && (
                                <FotgotPassword onChange={onChange} setUiState={setUiState} forgotPassword={forgotPassword} />
                            )
                        }
                        {
                            uiState === 'forgotPasswordSubmit' && (
                                <ForgotPasswordSubmit onChange={onChange} forgotPassword={forgotPasswordSubmit}  />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile