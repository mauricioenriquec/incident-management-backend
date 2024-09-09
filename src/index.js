import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Importar las rutas de usuario
import dotenv from 'dotenv';
import authMiddleware from './middlewares/authMiddleware.js';
import roleMiddleware from './middlewares/roleMiddleware.js';
import { deleteIncident } from './controllers/incidentController.js'; // Importar el controlador

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/users', userRoutes); // Usar las rutas de usuario

// Agregar la ruta de eliminación de incidencias con la verificación de rol
app.delete('/api/incidents/:id', authMiddleware, roleMiddleware(['admin', 'self']), deleteIncident);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
