// src/redux/user/authApi.js
const API_BASE_URL = 'http://localhost:3000/api/v1/auth';

export const checkEmail = async (email) => {
  const response = await fetch(`${API_BASE_URL}/check-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to check email');
  }

  return response.json();
};

export const sendOtp = async (email, fullName) => {
  const response = await fetch(`${API_BASE_URL}/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, fullName }),
  });

  if (!response.ok) {
    throw new Error('Failed to send OTP');
  }

  return response.json();
};

export const signUp = async (Nom, Prenom, Email, Pass, Role, otp) => {
  const response = await fetch(`${API_BASE_URL}/verify-otp-signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Nom, Prenom, Email, Pass, Role, otp }),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }

  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to log in');
  }

  return response.json();
};

export const signOutApi = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to log out');
  }

  return response.json();
};
