import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createad, deletead, getads, updatead } from '../controllers/ad.controller.js';

const router = express.Router();
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next();
});
router.post('/createad', verifyToken, createad)
router.get('/getads',getads)
router.delete('/deletead/:adId/:userId',verifyToken,deletead)
router.put('/updatead/:postId/:userId',verifyToken,updatead)


export default router;
