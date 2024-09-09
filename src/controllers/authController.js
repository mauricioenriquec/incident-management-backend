import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const authController = {
  register: (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    User.create({ name, email, password: hashedPassword, role }, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: 'User registered successfully' });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
      if (err) return res.status(500).json({ error: err });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Asegúrate de que user.password no sea undefined o null
      if (!user.password) return res.status(500).json({ error: 'User password is missing' });

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  }
};

export default authController;
