import db from '../config/db.js';

const Incident = {
  create: async (data) => {
    const query = 'INSERT INTO incidents (title, description, images, status, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    return db.query(query, [data.title, data.description, data.images, data.status, data.user_id, data.created_at]);
  },
  getAll: async () => {
    const query = 'SELECT * FROM incidents';
    return db.query(query);
  },
  getById: async (id) => {
    const query = 'SELECT * FROM incidents WHERE id = ?';
    return db.query(query, [id]);
  },
  getByUserId: async (userId) => {
    const query = 'SELECT * FROM incidents WHERE user_id = ?';
    return db.query(query, [userId]);
  },
  updateStatus: async (id, status) => {
    const query = 'UPDATE incidents SET status = ? WHERE id = ?';
    return db.query(query, [status, id]);
  },
  delete: async (id) => {
    const query = 'DELETE FROM incidents WHERE id = ?';
    return db.query(query, [id]);
  }
};

export default Incident;
