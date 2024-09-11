const User = {
  create: async (data) => {
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    await db.query(query, [data.name, data.email, data.password, data.role]);
  },
  
  updateById: async (id, data) => {
    const fields = [];
    const values = [];
    
    Object.keys(data).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    });
    
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    const [result] = await db.query(query, values);
    
    return result.affectedRows > 0;
  },
};

export default User;
