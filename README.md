# Text Similarity (Backends Only)

This app compares the similarity between two text inputs using AI embeddings.  
It uses:

- **FastAPI (Python)** to compute text embeddings and similarity scores
- **Express + TypeScript (Node.js)** to handle API requests and store results in MongoDB

---

## Structure

```text-similarity/
├── node-backend/ # Express.js + MongoDB
├── python-backend/ # FastAPI + SentenceTransformer
├── docker-compose.yml # Full-stack Docker setup
```

## How to Start

### 1. Clone the project

```bash
git clone https://github.com/your-username/text-similarity.git
cd text-similarity
```

### 2. Configure Environment Variables

PORT=3000
MONGO_URI=mongodb://mongo:27017/text-similarity
FASTAPI_URL=http://python-backend:8000 3. Start everything with Docker

### 3. Start the project

## API Usage

POST /compare

Send two texts. Returns similarity score and saves to DB.

`json { "text1": "I like express", "text2": "I like FastAPI" } `

GET /compare/history

Returns the latest 20 comparisons.

### Notes

Embeddings are calculated using paraphrase-MiniLM-L6-v2

MongoDB is used to persist history

CORS is enabled on both backends
