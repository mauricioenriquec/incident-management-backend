import Incident from '../models/Incident.js';

const roleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    const userRole = req.userRole;
    const userId = req.userId;
    const { id } = req.params;

    if (allowedRoles.includes('admin') && userRole === 'admin') {
      return next();
    }

    if (allowedRoles.includes('self')) {
      try {
        const [results] = await Incident.getById(id);
        if (results.length === 0) {
          return res.status(404).json({ message: 'Incident not found' });
        }
        const incident = results[0];
        if (incident.user_id === userId && userRole === 'resident') {
          return res.status(403).json({ message: 'Forbidden. Residents cannot delete incidents.' });
        } else if (incident.user_id === userId) {
          return next();
        } else {
          return res.status(403).json({ message: 'Forbidden' });
        }
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};

export default roleMiddleware;
