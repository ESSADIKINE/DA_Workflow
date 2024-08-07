const API_BASE_URL = 'http://localhost:3000/api/v1/articles';

const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('user-info')) || {};
    return userInfo.token;
};

export const fetchAllArticles = async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch all articles');
    }

    return response.json();
};

export const updateArticle = async (id, article) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(article),
    });

    if (!response.ok) {
        throw new Error('Failed to update article');
    }

    return response.json();
};

export const searchArticles = async (key) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/search?key=${key}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to search articles');
    }

    return response.json();
};

export const fetchArticlesByFournisseur = async (fournisseurId) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/fournisseur/${fournisseurId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch articles by fournisseur');
    }

    return response.json();
};

export const fetchArticlesInStock = async () => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/stock`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch articles in stock');
    }

    return response.json();
};
