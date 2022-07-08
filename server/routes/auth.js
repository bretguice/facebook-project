import express from 'express';
import { signin, signup, testDrive } from '../controllers/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/test', testDrive);

export default router;