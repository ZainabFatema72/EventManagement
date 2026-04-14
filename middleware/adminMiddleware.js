// middleware/adminMiddleware.js

const verifyAdmin = (req, res, next) => {
  // Assuming your user object is attached to the request
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { verifyAdmin };
