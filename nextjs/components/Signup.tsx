import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import Input from './Input'

interface signInprops {
    onChange:any
    setUiState:any
    signUp:any
}
const Signup: React.FC<signInprops> = (props) => { 

    return(
        <>
            <div>
                <p className="text-3xl font-black">Sign up for an your account</p>
                <div className="mt-10">
                    <label className="text-sm">Email Adress</label>
                    <Input onChange={props.onChange} name="email" type="email" />
                </div>
                <div className="mt-4">
                    <label className="text-sm">Password </label>
                    <Input onChange={props.onChange} name="password" type="password" />
                </div>
                <button onClick={props.signUp} className="text-white w-full mt-6 bg-pink-600 p-3 rounded">Sign Up</button>
                <p className="mt-12 text-sm font-light">
                    Already have an account?
                    <span onClick={() => props.setUiState('signIn')} role="button" className="cursor-pointer text-pink-600">Sign In</span>
                </p>
            </div>
        </>
    )
}
export default Signup;