import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { createCollaborator, findCollaboratorByEmail, findCollaboratorById, updateCollaboratorPasswordInDB } from '../models/userModel.js';
import { correctPassword, createSendToken } from '../utils/util.js';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error('Email or Password not provided');

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT, 10));
    const userId = nanoid();

    const user = await createCollaborator({ id: userId, email, password: hashedPassword });

    if (!user) throw new Error('Sign up error. Please try again.');

    createSendToken({ id: userId, email }, res);
  } catch (err) {
    console.log(`SIGNUP: ${err.message}`);
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error('Please provide email and password');

    const user = await findCollaboratorByEmail(email);

    if (!user || !(await correctPassword(password, user.CO_Pass)))
      throw new Error('Incorrect email or password');

    createSendToken(user, res);
  } catch (err) {
    console.log(`LOGIN: ${err.message}`);
    res.status(401).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'Token not valid. Please log in again.',
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await findCollaboratorById(decoded.id);

    if (!currentUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    req.user = currentUser;
    res.locals.user = currentUser;

    next();
  } catch (err) {
    console.log(`PROTECT: ${err.message}`);
    res.status(401).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const logout = (req, res) => {
  res.cookie(process.env.COOKIE_JWT, 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

export const updateCollaboratorPasswordById = async (req, res) => {
  try {
    const { id } = req.params;
    const { CO_Pass } = req.body;

    if (!CO_Pass) throw new Error('Password not provided');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(CO_Pass, parseInt(process.env.HASH_SALT, 10));

    const result = await updateCollaboratorPasswordInDB(id, hashedPassword);

    console.log('Update Password Result:', result);
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Password updated successfully',
        result,
      },
    });
  } catch (err) {
    console.log(`UPDATE PASSWORD: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
