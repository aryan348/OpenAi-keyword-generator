import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import Input from './Input'

interface signInprops {
    onChange:any
    setUiState:any
    forgotPassword:any
}
const FotgotPassword: React.FC<signInprops> = (props) => { 

    return(
        <>
            <div>
                <p className="text-3xl font-black">Forgot Password? Start here.</p>
                <div className="mt-10">
                    <label className="text-sm">Email</label>
                    <Input onChange={props.onChange} name="email"  />
                </div>
                <button onClick={props.forgotPassword} className="text-white w-full mt-6 bg-pink-600 p-3 rounded">Reset Password</button>
                <button onClick={() => props.setUiState('signIn')} className="text-sm mt-6 text-pink-600">Cancel</button>
            </div>
        </>
    )
}
export default FotgotPassword;