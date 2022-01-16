import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import Input from './Input'

interface signInprops {
    onChange:any
    forgotPassword:any
}
const FotgotPasswordSubmit: React.FC<signInprops> = (props) => { 

    return(
        <>
            <div>
                <p className="text-3xl font-black">Forgot Password? Start here.</p>
                <div className="mt-10">
                    <label className="text-sm">Confirmation Code</label>
                    <Input onChange={props.onChange} name="authCode"  />
                </div>
                <div className="mt-10">
                    <label className="text-sm">New Password</label>
                    <Input onChange={props.onChange} name="password"  type="password" />
                </div>
                <div className="mt-10">
                    <label className="text-sm">Confirm New Password</label>
                    <Input onChange={props.onChange} name="password"  type="password" />
                </div>
                <button onClick={props.forgotPassword} className="text-white w-full mt-6 bg-pink-600 p-3 rounded">Submit new password</button>
            </div>
        </>
    )
}
export default FotgotPasswordSubmit;