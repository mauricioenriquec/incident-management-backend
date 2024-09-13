import express from 'express';
import { register, login, getProfile, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; 
import roleMiddleware from '../middlewares/roleMiddleware.js'; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getProfile); 
router.get('/', authMiddleware, roleMiddleware(['admin']), getAllUsers); 
router.patch('/:id', authMiddleware, roleMiddleware(['admin', 'self']), updateUser); 
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser); 

export default router;
