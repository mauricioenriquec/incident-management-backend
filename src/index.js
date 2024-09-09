import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Importar las rutas de usuario

import authMiddleware from './middlewares/authMiddleware.js'; // Asegúrate de importar correctamente
import roleMiddleware from './middlewares/roleMiddleware.js'; // Importar el middleware de roles

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/incidents', authMiddleware, roleMiddleware(['admin', 'resident']), incidentRoutes);  // Rutas de incidentes
app.use('/api/users', userRoutes);  // Usar las rutas de usuario

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
