import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

// Utility function to get the token from local storage
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('user-info')) || {};
  return userInfo.token;
};

// Helper function to create an Axios instance with common settings
const createAxiosInstance = () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

// API functions
export const getCollaborateur = async () => {
  console.log('API: Fetching Collaborateur');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/collaborateur');
  console.log('API: Fetched Collaborateur:', response.data);
  return response.data;
};

export const getAllCT_Num = async () => {
  console.log('API: Fetching CT_Num');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/ct_num');
  console.log('API: Fetched CT_Num:', response.data);
  return response.data;
};

export const getDO_Devise = async () => {
  console.log('API: Fetching DO_Devise');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/do_devise');
  console.log('API: Fetched DO_Devise:', response.data);
  return response.data;
};

export const getAllDepot = async () => {
  console.log('API: Fetching Depot');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/depot');
  console.log('API: Fetched Depot:', response.data);
  return response.data;
};

export const getExpedition = async () => {
  console.log('API: Fetching Expedition');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/expedition');
  console.log('API: Fetched Expedition:', response.data);
  return response.data;
};

export const getAllAffaire = async () => {
  console.log('API: Fetching Affaire');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/affaire');
  console.log('API: Fetched Affaire:', response.data);
  return response.data;
};

export const getTaxe = async () => {
  console.log('API: Fetching Taxe');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/taxe');
  console.log('API: Fetched Taxe:', response.data);
  return response.data;
};

export const getAllEU_Enumere = async () => {
  console.log('API: Fetching EU_Enumere');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/eu_enumere');
  console.log('API: Fetched EU_Enumere:', response.data);
  return response.data;
};

export const getAllDemandeur = async () => {
  console.log('API: Fetching Demandeur');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/demandeur');
  console.log('API: Fetched Demandeur:', response.data);
  return response.data;
};

// New API function to fetch articlesDemander
export const getArticlesDemander = async () => {
  console.log('API: Fetching Articles Demander');
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/design');
  console.log('API: Fetched Articles Demander:', response.data);
  return response.data;
};
