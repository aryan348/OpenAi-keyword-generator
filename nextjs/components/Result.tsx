interface ResultProps{
    prompt:string
    snippet: string
    keywords:string[]
    onBack:any
    
    
}
const Result: React.FC<ResultProps> = (props) => {

    const keywordElements = []
    for(let i=0; i<props.keywords.length; i++){
        let elemnent = <div key={i}>#{props.keywords[i]}</div>
        keywordElements.push(elemnent)
    }

    return (
        <>
        <div>
            <div>
                <div><b>Prompt</b></div>
                <div>{props.prompt}</div>
            </div>
            <div>
                <div><b>Snippet</b></div>
                <div>{props.snippet}</div>
            </div>
            <div>
                <div><b>Keywords</b></div>
                <div>{keywordElements}</div>
            </div>
            
        </div>
        <button onClick={props.onBack}>Back</button>
        </>
    )
}

export default Result;