import express from 'express';
import upload from '../config/multerConfig.js';
import Incident from '../models/Incident.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router(); 

router.post('/', authMiddleware, upload.array('images', 3), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const images = req.files.map(file => file.path); 
    const user_id = req.user.id; 

    const newIncident = {
      title,
      description,
      images,
      status: 'submitted', 
      user_id,
      created_at: new Date(),
      location
    };

    await Incident.create(newIncident);
    res.status(201).send('Incidencia creada exitosamente');
  } catch (error) {
    console.error('Error al crear la incidencia:', error); 
    res.status(500).send('Error al crear la incidencia');
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const role = req.user.role;
    let incidents;

    if (role === 'admin') {
      incidents = await Incident.getAll();
    } else if (role === 'resident') {
      incidents = await Incident.getByUserId(req.user.id);
    } else {
      return res.sendStatus(403);
    }

    res.status(200).json(incidents);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al obtener las incidencias');
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const incident = await Incident.getById(req.params.id);

    if (!incident) {
      return res.status(404).send('Incidencia no encontrada');
    }

    if (req.user.role !== 'admin' && incident.user_id !== req.user.id) {
      return res.status(403).send('No tienes permiso para ver esta incidencia');
    }

    res.status(200).json(incident);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error al obtener la incidencia');
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const role = req.user.role;

    if (role !== 'admin') {
      return res.status(403).send('No tienes permiso para actualizar esta incidencia');
    }

    const incident = await Incident.updateStatus(req.params.id, status);

    if (!incident) {
      return res.status(404).send('Incidencia no encontrada');
    }

    res.status(200).send('Estado de la incidencia actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar la incidencia:', error);
    res.status(500).send('Error al actualizar la incidencia');
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const role = req.user.role;

    if (role !== 'admin') {
      return res.status(403).send('No tienes permiso para eliminar esta incidencia');
    }

    const incident = await Incident.delete(req.params.id);

    if (!incident) {
      return res.status(404).send('Incidencia no encontrada');
    }

    res.status(200).send('Incidencia eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la incidencia:', error);
    res.status(500).send('Error al eliminar la incidencia');
  }
});

export default router;
