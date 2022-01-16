import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import SocialSignin from './SocialSignin'
import Input from './Input'
interface signInprops {
    onChange:any
    setUiState:any
    signIn:any
}
const Signin: React.FC<signInprops> = (props) => { 

    return(
        <>
            <div>
                <p className="text-3xl font-black">Sign in to your account</p>
                <div className="mt-10">
                    <label className="text-sm">Email Adress</label>
                    <Input onChange={props.onChange} name="email" type="email" />
                </div>
                <div className="mt-4">
                    <label className="text-sm">Password <span onClick={() => props.setUiState('forgotPassword')} className="text-sm ml-8 sm:ml-48 text-pink-500">Forgot your password?</span></label>
                    <Input onChange={props.onChange} name="password" type="password" />
                </div>
                <button onClick={props.signIn} className="text-white w-full mt-6 bg-pink-600 p-3 rounded">Sign In</button>
                <SocialSignin />
                <p className="mt-12 text-sm font-light">
                    Don't have an account?
                    <span onClick={() => props.setUiState('signUp')} role="button" className="cursor-pointer text-pink-600">Sign Up</span>
                </p>
            </div>
        </>
    )
}
export default Signin;