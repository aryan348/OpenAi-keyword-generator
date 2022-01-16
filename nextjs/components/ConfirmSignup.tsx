import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import Input from './Input'
import React, { Component } from 'react';

interface signInprops {
    onChange:any
    setUiState:any
    confirmSignUp:any
    
}

const ConfirmSignUp: React.FC<signInprops> = (props) => { 

    return(
        <>
            <div>
                <p className="text-3xl font-black">Confirm your account</p>
                <div className="mt-10">
                    <label className="text-sm">Confirmation Code</label>
                    <input {...props} onChange={props.onChange} className="outline-none border-gray-300 border  rounded p-2 mt-3 w-full focus:shadow-inputfocus focus:border-white"/>
                </div>
                <button onClick={props.confirmSignUp} className="text-white w-full mt-6 bg-pink-600 p-3 rounded">Confirm Sign Up</button>
                <button onClick={() => props.setUiState('signIn')} className="text-sm mt-6 text-pink-600">Cancel</button>
            </div>
        </>
    )
}
export default ConfirmSignUp;