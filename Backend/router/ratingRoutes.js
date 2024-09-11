import express from "express"
import { Router } from 'express';
import { createRating, getMyRatings } from "../controller/ratingController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";


const router = Router();

router.post("/create", authenticateUser, createRating)
router.get('/me', authenticateUser, getMyRatings);

export default router;