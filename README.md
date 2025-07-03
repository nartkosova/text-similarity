# Text Similarity API

A microservices text similarity comparison API built with Node.js (TypeScript) and Python (FastAPI).

## Architecture

- **Node.js Backend**: Handles HTTP requests, validation, and MongoDB storage
- **Python Backend**: Processes text embeddings using sentence-transformers
- **MongoDB**: Stores comparison history
- **Docker**: Containerized deployment

## Features

- Text similarity comparison using sentence embeddings
- Input validation and error handling
- Comparison history storage
- Comprehensive test coverage
- Docker containerization
- Pydantic validation

## Quick Start

### Prerequisites

- Docker and Docker Compose
- MongoDB instance (or use MongoDB Atlas)

### Environment Setup

1. **Node.js Backend Environment**
   Create `node-backend/.env`:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/text-similarity
   FASTAPI_URL=http://python-backend:8000
   ```

2. **Python Backend Environment**
   Create `python-backend/.env`:
   ```env
   MODEL_NAME=paraphrase-MiniLM-L6-v2
   ```

### Running the Application

```bash
docker-compose up --build
```

The services will be available at:

- Node.js API: http://localhost:3000
- Python API: http://localhost:8000
- FastAPI Docs: http://localhost:8000/docs

## API Endpoints

### Node.js Backend (Port 3000)

#### POST /compare

Compare two texts for similarity.

**Request:**

```json
{
  "text1": "Hello world",
  "text2": "Hello there"
}
```

**Response:**

```json
{
  "score": 0.85
}
```

**Validation Rules:**

- Both `text1` and `text2` are required
- Must be strings
- Cannot be empty or whitespace-only
- Maximum length: 10,000 characters

#### GET /compare/history

Get recent comparison history.

**Response:**

```json
[
  {
    "text1": "Hello world",
    "text2": "Hello there",
    "score": 0.85,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Python Backend (Port 8000)

#### POST /compute-embeddings

Compute similarity score using sentence embeddings.

**Request:**

```json
{
  "text1": "Hello world",
  "text2": "Hello there"
}
```

**Response:**

```json
{
  "score": 0.85
}
```

## Development

### Running Tests

**Node.js Backend:**

```bash
cd node-backend
npm install
npm test
```

**Python Backend:**

```bash
cd python-backend
pip install -r requirements.txt
pytest
```

### Local Development

**Node.js Backend:**

```bash
cd node-backend
npm install
npm run dev
```

**Python Backend:**

```bash
cd python-backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Project Structure

```
text-similarity/
├── node-backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── comparisonController.ts
│   │   ├── models/
│   │   │   └── Comparison.ts
│   │   ├── routes/
│   │   │   └── comparisonRoutes.ts
│   │   ├── __tests__/
│   │   │   ├── setup.ts
│   │   │   └── comparison.test.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── jest.config.js
│   └── Dockerfile
├── python-backend/
│   ├── api/
│   │   └── routes.py
│   ├── models/
│   │   └── embeddings.py
│   ├── schemas/
│   │   └── compare_request.py
│   ├── main.py
│   ├── test_main.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

### Test Coverage

- Node.js: Jest with supertest for API testing
- Python: pytest with TestClient for FastAPI testing
- Mocked external dependencies (MongoDB, sentence-transformers)

## Error Handling

### Node.js Backend

- Input validation with detailed error messages
- Proper HTTP status codes (400, 500)
- Structured error responses
- Axios error handling for external API calls

### Python Backend

- Pydantic validation with custom validators
- HTTPException with proper status codes
- Detailed error messages for debugging
