import express from 'express';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.post('/upload', upload.array('images', 3), (req, res) => {
  try {
    res.status(200).send('Imágenes cargadas exitosamente');
  } catch (error) {
    res.status(400).send('Error al cargar las imágenes');
  }
});

export default router;
