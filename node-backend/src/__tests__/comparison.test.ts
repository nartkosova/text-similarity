import request from "supertest";
import express from "express";
import {
  handleComparison,
  getHistory,
} from "../controllers/comparisonController";
import Comparison from "../models/Comparison";
import axios from "axios";

jest.mock("../models/Comparison", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const app = express();
app.use(express.json());
app.post("/compare", handleComparison);
app.get("/history", getHistory);

describe("Comparison API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /compare", () => {
    it("should compare two texts successfully", async () => {
      const mockScore = 0.85;
      const mockSave = jest.fn().mockResolvedValue({});
      (Comparison as any).mockImplementation(() => ({ save: mockSave }));
      mockedAxios.post.mockResolvedValue({ data: { score: mockScore } });

      const response = await request(app)
        .post("/compare")
        .send({ text1: "hello world", text2: "hello there" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ score: mockScore });
    });

    it("should return 400 when fields are missing", async () => {
      const response = await request(app)
        .post("/compare")
        .send({ text1: "hello world" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 when fields are empty", async () => {
      const response = await request(app)
        .post("/compare")
        .send({ text1: "", text2: "hello there" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 500 when external API fails", async () => {
      mockedAxios.post.mockRejectedValue(new Error("API Error"));

      const response = await request(app)
        .post("/compare")
        .send({ text1: "hello world", text2: "hello there" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to compute similarity." });
    });
  });

  describe("GET /history", () => {
    it("should return comparison history", async () => {
      const mockHistory = [
        {
          text1: "hello",
          text2: "world",
          score: 0.5,
          createdAt: new Date().toISOString(),
        },
      ];

      Object.defineProperty(Comparison, "find", {
        value: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockHistory),
          }),
        }),
        writable: true,
      });

      const response = await request(app).get("/history");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockHistory);
    });
  });
});
