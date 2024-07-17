import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { findCollaboratorByEmail, findCollaboratorById, updateCollaboratorPasswordInDB } from '../models/userModel.js';

export const correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = async (token) => {
  return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

export const createSendToken = (user, res) => {
  const token = signToken(user.CO_No);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie(process.env.COOKIE_JWT, token, cookieOptions);

  user.CO_Pass = undefined;

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
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
