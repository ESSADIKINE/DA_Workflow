const API_BASE_URL = 'http://localhost:3000/api/v1/fournisseurs';

const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('user-info')) || {};
    return userInfo.token;
};

export const fetchAllFournisseurs = async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch all fournisseurs');
    }

    return response.json();
};

export const searchFournisseur = async (key) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/search?key=${key}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to search fournisseurs');
    }

    return response.json();
};

export const fetchFournisseurByARDesign = async (AR_Design) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/article?AR_Design=${AR_Design}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch fournisseur by AR_Design');
    }

    return response.json();
};
