import { Request, Response } from "express";
import axios from "axios";
import Comparison from "../models/Comparison";
import { config } from "../config/env";

export const handleComparison = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text1, text2 } = req.body;

  try {
    const { data } = await axios.post(
      `${config.FASTAPI_URL}/compute-embeddings`,
      {
        text1,
        text2,
      }
    );

    if (
      !text1 ||
      !text2 ||
      typeof text1 !== "string" ||
      typeof text2 !== "string"
    ) {
      res.status(400).json({
        error: "Both text1 and text2 are required and must be strings",
      });
      return;
    }

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
