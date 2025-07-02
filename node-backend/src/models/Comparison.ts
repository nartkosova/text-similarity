import mongoose from "mongoose";

const comparisonSchema = new mongoose.Schema({
  text1: { type: String, required: true },
  text2: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comparison", comparisonSchema);
