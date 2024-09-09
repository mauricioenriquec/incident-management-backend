const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = req.userRole; // Verificamos que `req.userRole` exista

    if (!userRole) {
      return res.status(401).json({ message: 'User role not found' });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: Insufficient role' });
    }

    next(); // Pasamos al siguiente middleware o controlador
  };
};

export default roleMiddleware;
