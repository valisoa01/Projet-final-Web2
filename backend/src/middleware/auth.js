 
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }
 
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

     req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (error) {
 
    console.error('Auth middleware error:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token invalide' });
    }

    res.status(401).json({ message: 'Erreur d\'authentification' });
   }
};

export default auth;
