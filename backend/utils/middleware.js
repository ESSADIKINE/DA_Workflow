import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { findCollaboratorById } from '../models/userModel.js';

// Middleware for checking roles
const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
      if (!token) return res.status(401).json({ status: 'fail', message: 'Token not valid. Please log in again.' });

      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const user = await findCollaboratorById(decoded.id);

      if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });

      if (user.CO_Fonction === role) return next();

      return res.status(403).json({ status: 'fail', message: 'Access denied' });
    } catch (err) {
      return res.status(401).json({ status: 'fail', message: err.message });
    }
  };
};

// Define specific role middleware
export const isDG = checkRole('DG');
export const isAdmin = checkRole('ADMIN');
export const isAchteur = checkRole('Achat');
export const isMagasinier = checkRole('magasinier');
export const isDemandeur = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) return res.status(401).json({ status: 'fail', message: 'Token not valid. Please log in again.' });

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await findCollaboratorById(decoded.id);

    if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });

    // If the user is not any of the above roles, they are a demandeur
    if (!['DG', 'ADMIN', 'Achat', 'magasinier'].includes(user.CO_Fonction)) return next();

    return res.status(403).json({ status: 'fail', message: 'Access denied' });
  } catch (err) {
    return res.status(401).json({ status: 'fail', message: err.message });
  }
};
