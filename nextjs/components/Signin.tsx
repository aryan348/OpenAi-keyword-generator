import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

const Signin: React.FC = () => { 
// export default function Signin(){
    return(
        <>
        <div>
            <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})}>Sign in with Google</button>
            <button onClick={() => Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook})}>Sign in with Facebook</button>
            
        </div>
        </>
    )
}
export default Signin;