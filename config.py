import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5"
API_TOKEN = os.getenv("HF_API_TOKEN")

HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json"
}
