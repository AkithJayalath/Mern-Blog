import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createad } from '../controllers/ad.controller.js';

const router = express.Router();
router.post('/createad', verifyToken, createad)


export default router;
