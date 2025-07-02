import { Request, Response } from "express";
import axios from "axios";
import Comparison from "../models/Comparison";
import dotenv from "dotenv";

dotenv.config();
const FASTAPI_URL = process.env.FASTAPI_URL || "";

export const handleComparison = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text1, text2 } = req.body;
  if (!text1 || !text2) {
    res.status(400).json({ error: "Both texts are required." });
    return;
  }

  try {
    const { data } = await axios.post(`${FASTAPI_URL}/compute-embeddings`, {
      text1,
      text2,
    });

    const comparison = new Comparison({
      text1,
      text2,
      score: data.score,
      createdAt: new Date(),
    });

    await comparison.save();
    res.status(200).json({
      score: data.score,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }

    res.status(500).json({ error: "Failed to compute similarity." });
  }
};

export const getHistory = async (_req: Request, res: Response) => {
  try {
    const comparisons = await Comparison.find()
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(comparisons);
  } catch (err) {
    res.status(500).json({ error: "Failed to load history." });
  }
};
