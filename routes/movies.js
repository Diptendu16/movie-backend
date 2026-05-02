import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const TMDB_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

// GET /api/movies/trending
router.get("/trending", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const response = await axios.get(
      `${TMDB_BASE}/trending/movie/week?api_key=${API_KEY}&page=${page}`,
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// GET /api/movies/search?query=batman&page=1
router.get("/search", async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });
    const response = await axios.get(
      `${TMDB_BASE}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// GET /api/movies/genres
router.get("/genres", async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE}/genre/movie/list?api_key=${API_KEY}`,
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});

// GET /api/movies/discover?genre=28&page=1
router.get("/discover", async (req, res) => {
  try {
    const { genre, page = 1 } = req.query;
    const response = await axios.get(
      `${TMDB_BASE}/discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}`,
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies by genre" });
  }
});

// GET /api/movies/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${TMDB_BASE}/movie/${id}?api_key=${API_KEY}`,
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

export default router;