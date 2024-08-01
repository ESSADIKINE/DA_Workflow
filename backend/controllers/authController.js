import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import otpGenerator from 'otp-generator';
import dotenv from 'dotenv';
import { findUserByEmail, createUser } from '../models/userModel.js';
import { sendEmail } from '../utils/Emails/Email.js';
import { emailTemplates } from '../utils/Emails/Templates.js';

dotenv.config();

const otpStore = {}; // In-memory store for OTPs

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

export const signUp = async (req, res) => {
  try {
    const { Nom, Prenom, Email, Pass, Role, otp } = req.body;

    if (!Nom || !Prenom || !Email || !Pass || !Role || !otp) {
      throw new Error('Please provide all required fields');
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@decayeuxstm\.com$/;
    if (!emailRegex.test(Email)) {
      throw new Error('Email must be in the format example@decayeuxstm.com');
    }

    const existingUser = await findUserByEmail(Email);
    if (existingUser) {
      throw new Error('Email is already taken');
    }

    if (otpStore[Email] !== otp) throw new Error('Invalid OTP');

    const hashedPassword = await bcrypt.hash(Pass, parseInt(process.env.HASH_SALT, 10));

    const newUser = await createUser({
      Nom,
      Prenom,
      Email,
      Pass: hashedPassword,
      Role,
    });

    createSendToken(newUser, res);
  } catch (err) {
    console.log(`SIGNUP: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email, fullName } = req.body;
    if (!email || !fullName) throw new Error('Please provide email and full name');

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    otpStore[email] = otp;

    const { subject, html } = emailTemplates.otp(fullName, otp);
    await sendEmail(email, subject, html);

    // Set OTP expiration (10 minutes)
    setTimeout(() => {
      delete otpStore[email];
    }, 10 * 60 * 1000);

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully',
    });
  } catch (err) {
    console.log(`SEND OTP: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) throw new Error('Please provide email and OTP');

    if (otpStore[email] !== otp) throw new Error('Invalid OTP');

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully',
    });
  } catch (err) {
    console.log(`VERIFY OTP: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
