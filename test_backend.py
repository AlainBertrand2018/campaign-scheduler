import requests
import json

URL = "http://localhost:8000/api/extract-dna"
PAYLOAD = {
    "name": "Enola AI",
    "website": "https://enola.ai",
    "industry": "Tech",
    "market": "Global",
    "language": "English",
    "social_urls": ["twitter.com/enola"],
    "tagline": "AI Swarm",
    "competitors": ["none"],
    "target_customer": "SaaS Brands",
    "problem_solved": "Slow advertising",
    "manifesto": "Agents for everyone"
}

try:
    print(f"Sending request to {URL}...")
    response = requests.post(URL, json=PAYLOAD, timeout=60)
    print(f"STATUS CODE: {response.status_code}")
    print(f"RESPONSE HEADERS: {response.headers}")
    print(f"RESPONSE BODY: {response.text}")
except Exception as e:
    print(f"ERROR: {e}")
