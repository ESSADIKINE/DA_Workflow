import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { findUserByEmail, updateUserPasswordInDB } from '../models/userModel.js';

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
  const token = signToken(user.User_id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie(process.env.COOKIE_JWT, token, cookieOptions);

  user.Pass = undefined;

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

    const user = await findUserByEmail(email);

    if (!user || !(await correctPassword(password, user.Pass)))
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

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { Pass } = req.body;

    if (!Pass) throw new Error('Password not provided');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(Pass, parseInt(process.env.HASH_SALT, 10));

    const result = await updateUserPasswordInDB(id, hashedPassword);

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
