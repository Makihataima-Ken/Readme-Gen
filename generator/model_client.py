import requests
from config import API_URL, HEADERS

def query_model(prompt: str) -> str:
    payload = {"inputs": prompt}
    response = requests.post(API_URL, headers=HEADERS, json=payload)

    if response.status_code != 200:
        raise Exception(f"API Error {response.status_code}: {response.text}")

    try:
        return response.json()[0]["generated_text"]
    except (KeyError, IndexError):
        raise ValueError("Unexpected response format from the model.")
