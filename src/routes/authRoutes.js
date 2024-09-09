import express from 'express';
import { register, login, getProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Verificación del token

const router = express.Router();

// Rutas de autenticación y perfil
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile); // Ruta protegida

export default router;
