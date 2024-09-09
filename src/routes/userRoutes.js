import express from 'express';
import { register, login, getProfile, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // Verificación del token
import roleMiddleware from '../middlewares/roleMiddleware.js'; // Verificación de roles

const router = express.Router();

// Rutas de autenticación y perfil
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.patch('/:id', authMiddleware, roleMiddleware(['admin', 'self']), updateUser); // Nueva ruta para actualizar los datos del usuario

export default router;
