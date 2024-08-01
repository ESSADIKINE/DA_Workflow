// controllers/authController.js
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

export const checkEmailExists = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error('Please provide an email');

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(200).json({
        status: 'exists',
        message: 'Email already exists',
      });
    } else {
      return res.status(200).json({
        status: 'available',
        message: 'Email is available',
      });
    }
  } catch (err) {
    console.log(`CHECK EMAIL EXISTS: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
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

export const sendOTP = async (req, res) => {
  try {
    const { email, fullName } = req.body;
    if (!email || !fullName) throw new Error('Please provide email and full name');

    console.log(`Received request to send OTP to ${email} for ${fullName}`);

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    otpStore[email] = otp;

    console.log(`Generated OTP: ${otp} for email: ${email}`);

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



export const signUp = async (req, res) => {
  try {
    const { Nom, Prenom, Email, Pass, Role, otp } = req.body;

    if (!Nom || !Prenom || !Email || !Pass || !Role || !otp) {
      throw new Error('Please provide all required fields');
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

export const verifyOTPAndSignup = async (req, res) => {
  console.log('Received request at verifyOTPAndSignup'); // Log entry point
  try {
    const { Email, otp, Nom, Prenom, Pass, Role } = req.body;
    console.log('Request body:', req.body); // Log request body

    if (!Email || !otp) {
      console.log('Email or OTP missing'); // Log missing data
      throw new Error('Please provide email and OTP');
    }

    console.log('Checking OTP store for email:', Email); // Log OTP check
    if (otpStore[Email] !== otp) {
      console.log('Invalid OTP for email:', Email); // Log invalid OTP
      throw new Error('Invalid OTP');
    }

    console.log('Hashing password for email:', Email); // Log password hashing
    const hashedPassword = await bcrypt.hash(Pass, parseInt(process.env.HASH_SALT, 10));

    console.log('Creating user with email:', Email); // Log user creation attempt
    const newUser = await createUser({
      Nom,
      Prenom,
      Email,
      Pass: hashedPassword,
      Role,
    });

    console.log('User created successfully:', newUser); // Log successful user creation

    res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(`Error in verifyOTPAndSignup: ${err.message}`); // Log error
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};





