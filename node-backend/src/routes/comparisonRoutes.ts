import express from "express";
import {
  getHistory,
  handleComparison,
} from "../controllers/comparisonController";

const router = express.Router();

router.post("/", handleComparison);
router.get("/history", getHistory);

export default router;
