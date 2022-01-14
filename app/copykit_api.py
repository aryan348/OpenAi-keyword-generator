from fastapi import FastAPI, HTTPException
from copykit import generate_branding_snippet, generate_keywords

app = FastAPI()

MAX_LENGTH = 32

@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_inputLength(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

@app.get("/generate_keyword")
async def generate_keywords_api(prompt: str):
    validate_inputLength(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None,"keywords": keywords}

# combined snippet plus keywords
@app.get("/generate_snippet_and_keyword")
async def generate_keywords_api(prompt: str):
    validate_inputLength(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}

def validate_inputLength(prmopt: str):
    if len(prmopt) >= MAX_LENGTH:
        raise HTTPException(status_code=400, detail=f"Input length is too long. Must be under {MAX_LENGTH} charachters")
    