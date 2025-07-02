import pytest
from fastapi.testclient import TestClient
from main import app
from models.embeddings import compute_score

client = TestClient(app)

class TestComparisonAPI:
    def test_compute_similarity_success(self):
        """Test successful similarity computation"""
        response = client.post(
            "/compute-embeddings",
            json={"text1": "Hello world", "text2": "Hello there"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "score" in data
        assert isinstance(data["score"], float)
        assert 0 <= data["score"] <= 1

    def test_missing_fields(self):
        """Test validation error when required fields are missing"""
        response = client.post(
            "/compute-embeddings",
            json={"text1": "Hello world"}  # Missing text2
        )
        
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data

    def test_empty_fields(self):
        """Test validation error when fields are empty"""
        response = client.post(
            "/compute-embeddings",
            json={"text1": "", "text2": "Hello there"}
        )
        
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data

class TestEmbeddingsModel:
    def test_compute_score_function(self):
        """Test the compute_score function directly"""
        score = compute_score("Hello world", "Hello there")
        assert isinstance(score, float)
        assert 0 <= score <= 1 