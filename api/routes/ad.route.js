import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createad, getads } from '../controllers/ad.controller.js';

const router = express.Router();
router.post('/createad', verifyToken, createad)
router.get('/getads',getads)


export default router;
