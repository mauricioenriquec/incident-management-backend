import db from '../config/db.js';

const Incident = {
  create: async (data) => {
    const query = 'INSERT INTO incidents (title, description, images, status, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    await db.query(query, [data.title, data.description, JSON.stringify(data.images), data.status, data.user_id, data.created_at]);
  },
  getAll: async () => {
    const query = 'SELECT * FROM incidents';
    const [results] = await db.query(query);
    return results;
  },
  getById: async (id) => {
    const query = 'SELECT * FROM incidents WHERE id = ?';
    const [results] = await db.query(query, [id]);
    return results[0];
  },
  getByUserId: async (userId) => {
    const query = 'SELECT * FROM incidents WHERE user_id = ?';
    const [results] = await db.query(query, [userId]);
    return results;
  },
  updateStatus: async (id, status) => {
    const query = 'UPDATE incidents SET status = ? WHERE id = ?';
    const [result] = await db.query(query, [status, id]);
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const query = 'DELETE FROM incidents WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
  }
};

export default Incident;
