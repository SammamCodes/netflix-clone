import express from "express";
import { getSimilarTv, getTrendingTv, getTvByCategory, getTvDetails } from "../controllers/tv.controller.js";
import { getMovieTrailers } from "../controllers/movie.controller.js";
const router= express.Router();
//work for tv routes from here 
router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category",getTvByCategory);
export default router;