import { useState,  useEffect } from "react";
import React from 'react';
import { Auth } from "aws-amplify";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignOut,AmplifySignUp  } from '@aws-amplify/ui-react';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import '../configureamplify';

const initialState = {email:'',password:'', authCode:''}

const Profile: React.FC = () => { 
    const [authState, setAuthState] = React.useState<AuthState>();
    const [uiState, setUiState] = React.useState("")
    const [formState, setformState] = React.useState(initialState)
    const [user, setUser] = React.useState<object | undefined>();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
          <div>Hello, {user.attributes.email}</div>
          <AmplifySignOut />
      </div>
  ) : (
    <AmplifyAuthenticator>
    <AmplifySignUp
      slot="sign-up"
      formFields={[
        { type: "username" },
        { type: "password" },
        { type: "email" }
      ]}
    />
  </AmplifyAuthenticator>
  );
}

export default Profile