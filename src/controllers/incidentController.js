import dayjs from 'dayjs';
import Incident from '../models/Incident.js';

export const createIncident = async (req, res) => {
  const { title, description, images } = req.body;
  const user_id = req.userId; // Obtener el ID del usuario autenticado
  const imagesJson = JSON.stringify(images); // Convertir el array de imágenes a una cadena JSON
  const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss'); // Formatear la fecha con Day.js

  try {
    const query = 'INSERT INTO incidents (title, description, images, status, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await Incident.create({ title, description, images: imagesJson, status: 'Submitted', user_id, created_at: createdAt });
    res.status(201).json({ message: 'Incident created successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllIncidents = async (req, res) => {
  const userRole = req.userRole;
  const userId = req.userId;
  try {
    let results;
    if (userRole === 'admin') {
      [results] = await Incident.getAll();
    } else {
      [results] = await Incident.getByUserId(userId);
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getIncidentById = async (req, res) => {
  const { id } = req.params;
  const userRole = req.userRole;
  const userId = req.userId;
  try {
    const [results] = await Incident.getById(id);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    const incident = results[0];
    if (userRole !== 'admin' && incident.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateIncidentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userRole = req.userRole;

  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const [result] = await Incident.updateStatus(id, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json({ message: 'Incident status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteIncident = async (req, res) => {
  const { id } = req.params;
  const userRole = req.userRole;

  // Solo admins pueden eliminar incidentes
  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  try {
    const [result] = await Incident.delete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json({ message: 'Incident deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
