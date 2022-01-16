import { useState,  useEffect } from "react";
import React from 'react';
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import '../configureamplify'
import Signin from '../components/Signin'


const initialState = {email:'',password:'', authCode:''}

const Profile: React.FC = () => { 
    const [uiState, setUiState] = React.useState("")
    const [formState, setformState] = React.useState(initialState)
    const [user, setUser] = React.useState(null)

    useEffect(() => {
        checkUser()
        async function checkUser(){
            try {
                const user = await Auth.currentAuthenticatedUser()
                setUser(user)
                setUiState('signedIN')
            } catch (err){
                setUser(null)
                setUiState('signedOut')
            }
        }
    }, [])
    const changeFunction = (e:any) => {
        setformState({...formState, [e.target.name]: e.target.value })
    }
    return(
        <div>
            {
                uiState === 'signin' && (
                    <Signin
                        onChange={changeFunction}
                        setUiState={setUiState}
                    />
                )
            }
            {
                uiState === 'signin' && (
                    <div>
                        <p className="text-xl">Welcome, {user.username}</p>
                        <button className="text-white w-full mt-10 bg-pink-600" onClick={() => {
                            Auth.signOut(); 
                            setUiState('signedOut');
                            setUiState("");
                            }}
                            >Sign Out</button>
                    </div>
                )

            }
        </div>
        
    )
}

export default Profile