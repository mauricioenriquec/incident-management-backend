import db from '../config/db.js';

const User = {
  create: (data, callback) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [data.name, data.email, data.password, data.role], callback);
  },
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },
  findById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },
};

export default User;
