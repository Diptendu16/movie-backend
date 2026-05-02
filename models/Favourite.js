import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
    },
    vote_average: {
      type: Number,
    },
    release_date: {
      type: String,
    },
  },
  { timestamps: true },
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;
