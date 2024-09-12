import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { handleError } from '../utils/handleError.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    handleError(res, error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    handleError(res, error);
  }
};

export const getProfile = async (req, res) => {
  try {
    // Usar req.user.id en lugar de req.userId
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  try {
    const query = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    const [result] = await db.query(query, [name, email, hashedPassword, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
