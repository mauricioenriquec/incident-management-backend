import dayjs from 'dayjs';
import Incident from '../models/Incident.js';

export const createIncident = async (req, res) => {
  const { title, description, images } = req.body;
  const user_id = req.userId;
  const imagesJson = JSON.stringify(images);
  const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

  try {
    await Incident.create({ title, description, images: imagesJson, status: 'Submitted', user_id, created_at: createdAt });
    res.status(201).json({ message: 'Incident created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllIncidents = async (req, res) => {
  const userRole = req.userRole;
  const userId = req.userId;
  try {
    const results = userRole === 'admin' ? await Incident.getAll() : await Incident.getByUserId(userId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIncidentById = async (req, res) => {
  const { id } = req.params;
  const userRole = req.userRole;
  const userId = req.userId;
  try {
    const incident = await Incident.getById(id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });

    if (userRole !== 'admin' && incident.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const updated = await Incident.updateStatus(id, status);
    if (!updated) return res.status(404).json({ message: 'Incident not found' });
    res.json({ message: 'Incident status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteIncident = async (req, res) => {
  const { id } = req.params;
  const userRole = req.userRole;

  if (userRole !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }

  try {
    const deleted = await Incident.delete(id);
    if (!deleted) return res.status(404).json({ message: 'Incident not found' });
    res.json({ message: 'Incident deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
