import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";


const Input: React.FC = (props) => { 
    return(
        <>
            <input {...props}  className="outline-none border-gray-300 border  rounded p-2 mt-3 w-full focus:shadow-inputfocus focus:border-white"/>
        </>
    )
}

export default Input;