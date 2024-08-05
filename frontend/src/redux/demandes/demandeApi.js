const API_BASE_URL = 'http://localhost:3000/api/v1/demandes';

const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('user-info')) || {};
  return userInfo.token;
};

export const createDemande = async (demande) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(demande),
  });

  if (!response.ok) {
    throw new Error('Failed to create demande');
  }

  return response.json();
};

export const getDemandes = async () => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch demandes');
  }

  return response.json();
};

export const updateDemande = async (id, demande) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(demande),
  });

  if (!response.ok) {
    throw new Error('Failed to update demande');
  }

  return response.json();
};

export const deleteDemande = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete demande');
  }

  return response.json();
};

export const getArticlesBySelection = async (key) => {
  const token = getToken();
  const response = await fetch(`${API_BASE_URL}/selection?key=${key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  return response.json();
};
