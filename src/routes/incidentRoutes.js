import express from 'express';
import upload from '../config/multerConfig.js';
import Incident from '../models/Incident.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router(); 

router.post('/', authMiddleware, upload.array('images', 3), async (req, res) => {
  try {
    const { title, description } = req.body;
    const images = req.files.map(file => file.path); 
    const user_id = req.user.id; 

    const newIncident = {
      title,
      description,
      images,
      status: 'submitted', 
      user_id,
      created_at: new Date()
    };

    await Incident.create(newIncident);
    res.status(201).send('Incidencia creada exitosamente');
  } catch (error) {
    console.error(error); 
    res.status(400).send('Error al crear la incidencia');
  }
});

export default router;
