import express from "express"
import { Router } from 'express';
import { createRating, getMyRatings, getAllRatings } from "../controller/ratingController.js";
import { authenticateUser, authorizeEmployer } from "../middlewares/authMiddleware.js";


const router = Router();

router.post("/create", authenticateUser, createRating)
router.get('/me', authenticateUser, getMyRatings);
router.get('/allRatings', authenticateUser, authorizeEmployer,  getAllRatings);

export default router;