
interface FormProps {
    prompt:string;
    setPrompt:any;
    onSubmit:any
    isLoading:boolean
    charachterLimit:number
}
const Form: React.FC<FormProps> = (props) => {
    const isPropmptValid = props.prompt.length <= props.charachterLimit
    const updatePrompValue = (text:string) => {
        if (text.length <= props.charachterLimit){
            props.setPrompt(text)
        }
    }

    return (
        <>
        <p>Tell me what your brand is about and I would generate tagline and Keywords</p>
        
        <input 
            type="text" 
            placeholder="Coffee" 
            value={props.prompt} onChange={(e) => updatePrompValue(e.currentTarget.value)} 
        ></input>
        <div>{props.prompt.length}/{props.charachterLimit}</div>
        <button onClick={props.onSubmit} type="submit" disabled={props.isLoading || !isPropmptValid}>Submit</button>
        </>
    )
}

export default Form;