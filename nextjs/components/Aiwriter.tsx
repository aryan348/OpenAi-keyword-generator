import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import Form from './Form';
import Result from './Result';
import { Auth } from "aws-amplify";


const Aiwriter: React.FC = () => {
    const CHAR_LIMIT :number = 32
    let JWT:string = ''
    const ENDPOINT:string = "https://zdp8k2d9i1.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keyword"
    const [prompt, setPrompt] = React.useState("")
    const [snippet, setSnippet] = React.useState("")
    const [keywords, setKeywords] = React.useState([])
    const [hasresult, setHasresult] = React.useState(false)
    const [isLoading, setIsloading] = React.useState(false)
   
    Auth.currentSession().then(res=>{
    let accessToken = res.getAccessToken()
    let jwt = accessToken.getJwtToken()
    //You can print them to see the full objects
    console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
    console.log(`myJwt: ${jwt}`)
    })
      
    const onSubmit = () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "eyJraWQiOiJ1UldFVzl6VWh2TkVGT1lTcGhuNHpwMmpJYzd1Q1NBd3Q1cThINFJ6YVZZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiZWI1M2FjZS02MDI1LTRjN2ItODM0My0yMDYwNWI1MDE4ODQiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfRFhCRWtXS3NNX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9EWEJFa1dLc00iLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIxcjg3Mm42MTliNTMzNmtlbmMyZml2MmYzYiIsIm9yaWdpbl9qdGkiOiIzNWQ2M2UxNS05OGNlLTQwMjktYmMwMi1iZjI2YWE2ZmQyNTMiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjQyMzk1MzE1LCJleHAiOjE2NDIzOTg5MTUsImlhdCI6MTY0MjM5NTMxNSwianRpIjoiYzhmZjMzNzAtMGE3Yy00ODRhLWE2ZjctOWI1ZDQwOTNmYzFhIiwidXNlcm5hbWUiOiJnb29nbGVfMTE0MTc0ODQ2NDQwOTI4Njk0MTAxIn0.hHrm1KSRymXEiU5ohP_cCTSZUNQlMHjFpON1YJVNnEIdr144blYVBI87JHDge0N3IQsZ6B7IbdLqGdPpb4nPtlkqWW0-Pt1FtYvLYbWfmIBQuxfNxoJ93Vi9uGoP5wqoM5a2ErNh3WvTmTXytWOXO9ZUP93GM1bN7lDCZJZvf8JFCibhPzctUuchz8rjfi9ZBa98FdEo_wdt6NfXA8_mbDLROkhi889Q6JikpuwMXQD554l0D0x3-lOmCLYYu4Z2lLK_ZbR3iCw1FzKhhcB-x5TndLY2nFKAlR_cPNQrLlMmZm8k7VZ5A_kQer42I4wERfw3SNJ75UKpSzP5i94mNA");
        var raw = "";

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        };
        console.log("Submitting: " + prompt)
        
        // let myToken = Auth.currentSession().then(data => console.log(data.accessToken));
        console.log(JWT)
        setIsloading(true)
        fetch(`${ENDPOINT}?prompt=${prompt}`,requestOptions)
            .then((res)=> res.json())
            .then(onResult)
    }
    const onResult = (data:any) => {
        setSnippet(data.snippet)
        setKeywords(data.keywords)
        setHasresult(true)
        setIsloading(false)
    }
    const onReset = (data:any) => {
        setPrompt("")
        setHasresult(false)
        setIsloading(false)
    }
    let displayedElement = null
    if  (hasresult){
        displayedElement = <Result snippet={snippet} keywords={keywords} onBack={onReset} prompt={prompt} />
    } else{ 
        displayedElement = <Form prompt={prompt} setPrompt={setPrompt} onSubmit={onSubmit} isLoading={isLoading} charachterLimit={CHAR_LIMIT} />
    }

    return(
        <>
            <h1 className="text-3xl">Ai Writer</h1>
            {/* <AmplifyAuthenticator> */}
            {displayedElement}
            {/* </AmplifyAuthenticator> */}
        </>
    )
}
export default Aiwriter;