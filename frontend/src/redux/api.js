const API_BASE_URL = 'http://localhost:3000/api/v1/auth';

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

export const verifyOtp = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    throw new Error('Failed to verify OTP');
  }

  return response.json();
};

export const signUp = async (Nom, Prenom, Email, Pass, Role, otp) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
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
