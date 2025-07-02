import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import comparisonRoutes from "./routes/comparisonRoutes";
import { config } from "./config/env";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/compare", comparisonRoutes);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err, config.MONGO_URI));
