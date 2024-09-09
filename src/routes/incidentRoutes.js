import express from 'express';
import { createIncident, getAllIncidents, getIncidentById, updateIncidentStatus, deleteIncident } from '../controllers/incidentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createIncident);
router.get('/', authMiddleware, getAllIncidents);
router.get('/:id', authMiddleware, getIncidentById); // Nueva ruta para obtener una incidencia por ID
router.patch('/:id/status', authMiddleware, updateIncidentStatus);
router.delete('/:id', authMiddleware, deleteIncident);

export default router;
