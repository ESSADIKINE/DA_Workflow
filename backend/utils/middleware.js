import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { findUserById } from '../models/userModel.js';

// Middleware to check if the user is authenticated
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access.',
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await findUserById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Token not valid or expired! Please log in again.',
    });
  }
};

// Middleware to check if the user has admin privileges
export const isAdmin = (req, res, next) => {
  if (req.user.Role === 'admin') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has acheteur privileges
export const isAchteur = (req, res, next) => {
  if (req.user.Role === 'achteur') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has dg (Directeur Général) privileges
export const isDG = (req, res, next) => {
  if (req.user.Role === 'dg') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has demandeur privileges
export const isDemandeur = (req, res, next) => {
  if (req.user.Role === 'demandeur') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has magasinier privileges
export const isMagasinier = (req, res, next) => {
  if (req.user.Role === 'magasinier') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};
