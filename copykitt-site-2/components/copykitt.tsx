import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/copykittLogo.svg";

const CopyKitt: React.FC = () => {
  const CHARACTER_LIMIT: number = 32;
  const ENDPOINT: string =
    "https://zdp8k2d9i1.execute-api.us-east-1.amazonaws.com/prod/generate_snippet_and_keyword";
  const [prompt, setPrompt] = React.useState("");
  const [snippet, setSnippet] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const [hasResult, setHasResult] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  
  const onSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "eyJraWQiOiJ1UldFVzl6VWh2TkVGT1lTcGhuNHpwMmpJYzd1Q1NBd3Q1cThINFJ6YVZZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiZWI1M2FjZS02MDI1LTRjN2ItODM0My0yMDYwNWI1MDE4ODQiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfRFhCRWtXS3NNX0dvb2dsZSJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjQyNDAxOTc5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9EWEJFa1dLc00iLCJleHAiOjE2NDI0MDU1NzksImlhdCI6MTY0MjQwMTk4MCwidmVyc2lvbiI6MiwianRpIjoiZjY0ODNkOGYtMzExNS00NGM0LWJhZGQtMTIyYTE3YTMwZWQxIiwiY2xpZW50X2lkIjoiNWtxM2lkdDRuc3IzYW12amVjdTg1NDNyY20iLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTQxNzQ4NDY0NDA5Mjg2OTQxMDEifQ.lbrqKsd-J0L3PQcVNYG7OkpHebD26jHIG_Q3rN0edsQTObwtA37It6F5SXJ0ww8N70jDK7XOqkjQkqzFLGHoIG3_Oe7r-rizOxM32UkPV3EZV6MxC27q1Heg1PN0R7I8OxKcdzqkPE59SdrlHqVbUbxRz4jXH8Kw-sacb9I1QClLsMPbVIKNZU80d3IrzcSQNkTX12Nko9ZV8uVidoEjgH2RVTI_CpHxVE-XmWP-64oFndqV9qCVdpqdHXSA9AXca-G7OW4ZOM3GQQjM_phHapF8jalzEMh4URfvTzprqQMLS3Lm_wTbK4i129sT4hs80C6B7N5blVK3femp4oPPxw");
    var raw = "";

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    };
    console.log("Submitting: " + prompt);
    setIsLoading(true);
    fetch(`${ENDPOINT}?prompt=${prompt}`,requestOptions)
      .then((res) => res.json())
      .then(onResult);
  };

  const onResult = (data: any) => {
    setSnippet(data.snippet);
    setKeywords(data.keywords);
    setHasResult(true);
    setIsLoading(false);
  };

  const onReset = () => {
    setPrompt("");
    setHasResult(false);
    setIsLoading(false);
  };

  let displayedElement = null;

  if (hasResult) {
    displayedElement = (
      <Results
        snippet={snippet}
        keywords={keywords}
        onBack={onReset}
        prompt={prompt}
      />
    );
  } else {
    displayedElement = (
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={onSubmit}
        isLoading={isLoading}
        characterLimit={CHARACTER_LIMIT}
      />
    );
  }

  const gradientTextStyle =
    "text-white text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

  return (
    <div className="h-screen flex">
      <div className="max-w-md m-auto p-2">
        <div className="bg-slate-800 p-6 rounded-md text-white">
          <div className="text-center my-6">
            <Image src={logo} width={42} height={42} />
            <h1 className={gradientTextStyle + " text-3xl font-light"}>
              CopyKitt
            </h1>
            <div className={gradientTextStyle}>Your AI branding assistant</div>
          </div>

          {displayedElement}
        </div>
      </div>
    </div>
  );
};

export default CopyKitt;
