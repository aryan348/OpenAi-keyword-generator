import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import Form from './Form';
import Result from './Result';

const Aiwriter: React.FC = () => {
    const CHAR_LIMIT :number = 32
    const ENDPOINT:string = "https://zdp8k2d9i1.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keyword"
    const [prompt, setPrompt] = React.useState("")
    const [snippet, setSnippet] = React.useState("")
    const [keywords, setKeywords] = React.useState([])
    const [hasresult, setHasresult] = React.useState(false)
    const [isLoading, setIsloading] = React.useState(false)

    const onSubmit = () => {
        console.log("Submitting: " + prompt)
        setIsloading(true)
        fetch(`${ENDPOINT}?prompt=${prompt}`)
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
            <AmplifyAuthenticator>
            {displayedElement}
            </AmplifyAuthenticator>
        </>
    )
}
export default Aiwriter;