import express from 'express';
import { register, login, getProfile, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; 
import roleMiddleware from '../middlewares/roleMiddleware.js'; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getProfile); 
router.patch('/:id', authMiddleware, roleMiddleware(['admin', 'self']), updateUser); 

export default router;
