import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { findCollaboratorById } from '../models/userModel.js';

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
    const currentUser = await findCollaboratorById(decoded.id);

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
  if (req.user.DA_Role === 'isAdmin') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has acheteur privileges
export const isAchteur = (req, res, next) => {
  if (req.user.DA_Role === 'isAchteur') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has Dérecteur général privileges
export const isDG = (req, res, next) => {
  if (req.user.DA_Role === 'isDG') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has demandeur privileges
export const isDemandeur = (req, res, next) => {
  if (req.user.DA_Role === 'isDemandeur') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};

// Middleware to check if the user has magasenier privileges
export const isMagasenier = (req, res, next) => {
  if (req.user.DA_Role === 'isMagasinier') {
    return next();
  }
  res.status(403).json({
    status: 'fail',
    message: 'You do not have permission to perform this action',
  });
};