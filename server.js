import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "./routes/movies.js";
import favouriteRoutes from "./routes/favourites.js";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://movie-browser-silk.vercel.app"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("MongoDB connection error", err.message));

app.use("/api/movies", movieRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Movie API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
