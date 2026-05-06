import express from "express";
import Favourite from "../models/Favourite.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
router.use(authMiddleware);

// GET /api/favourites — get all favourites
router.get("/", async (req, res) => {
  try {
    const favourites = await Favourite.find().sort({ createdAt: -1 });
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favourites" });
  }
});

// POST /api/favourites — add a favourite
router.post("/", async (req, res) => {
  try {
    const { movieId, title, poster_path, vote_average, release_date } =
      req.body;

    const existing = await Favourite.findOne({ movieId });
    if (existing) {
      return res.status(400).json({ error: "Already in favourites" });
    }

    const addFavourite = await Favourite.create({
      userId: req.userId,
      movieId,
      title,
      poster_path,
      vote_average,
      release_date,
    });

    res.status(201).json(addFavourite);
  } catch (err) {
    res.status(500).json({ error: "Failed to add favourite" });
  }
});

// DELETE /api/favourites/:movieId — remove a favourite
router.delete("/:movieId", async (req, res) => {
  try {
    const { movieId } = req.params;
    const deleted = await Favourite.findOneAndDelete({
      movieId: Number(movieId),
    });

    if (!deleted) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.json({ message: "Removed from favourites" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove favourite" });
  }
});

export default router;
