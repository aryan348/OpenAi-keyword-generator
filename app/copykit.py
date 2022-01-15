
import os
from typing import List
from urllib import request
import openai
import argparse
import re

MAX_LENGTH = 32

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    print(f"User input: {user_input}")
    
    if validate_length(user_input):
        generate_branding_snippet(user_input)
        generate_keywords(user_input)
        
    else:
        raise ValueError(f"Input is too long. Must be less then {MAX_LENGTH}")
    
    
# validate so user doesn't enter long keywords
def validate_length(userprompt: str) -> bool:
    return len(userprompt) <= MAX_LENGTH
    
    
    
def generate_branding_snippet(userprompt: str) -> str:
    
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

  
    prompt = f"Generate upbeat branding snippet for {userprompt}: "
    print(prompt)
    response = openai.Completion.create(engine="davinci-instruct-beta-v3", prompt=prompt, max_tokens=32)
    # print(response)
    branding_text: str = response["choices"][0]['text']
    
    # strip whitespace
    branding_text = branding_text.strip()
    
    # check last char if . ifnot . add ...
    last_char = branding_text[-1]
    if last_char not in {".","!","?"}:
        branding_text += "..."
    
    print(f"Snippet: {branding_text}")
    return branding_text
    


def generate_keywords(userprompt: str) -> List[str]:
    
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

  
    prompt = f"Generate related branding keywords for {userprompt}: "
    print(prompt)
    
    response = openai.Completion.create(engine="davinci-instruct-beta-v3", prompt=prompt, max_tokens=32)
    # print(response)
    keywords_text: str = response["choices"][0]['text']
    
    # strip whitespace
    keywords_text = keywords_text.strip()
    # split keywords in arrays
    keywords_array = re.split(",|\n|;|-", keywords_text)
    
    # remove white space in array  # make lowercase
    keywords_array = [k.lower().strip() for k in keywords_array]
    # remove empty
    keywords_array = [k for k in keywords_array if len(k) > 0]
   
    
    print(f"Keywords: {keywords_array}")
    return keywords_array


if __name__ == "__main__":
        main()