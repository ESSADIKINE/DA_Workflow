import * as daModel from '../models/additionalModel.js'; // Ensure the .js extension

export const getCollaborateur = async (req, res) => {
  console.log('Controller: Fetching Collaborateur');
  try {
    const data = await daModel.getCollaborateur();
    console.log('Controller: Fetched Collaborateur:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching Collaborateur:', err);
    res.status(500).json({ message: 'Error fetching collaborateur', error: err });
  }
};

export const getAllCT_Num = async (req, res) => {
  console.log('Controller: Fetching CT_Num');
  try {
    const data = await daModel.getAllCT_Num();
    console.log('Controller: Fetched CT_Num:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching CT_Num:', err);
    res.status(500).json({ message: 'Error fetching CT_Num', error: err });
  }
};

export const getDO_Devise = async (req, res) => {
  console.log('Controller: Fetching DO_Devise');
  try {
    const data = await daModel.getDO_Devise();
    console.log('Controller: Fetched DO_Devise:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching DO_Devise:', err);
    res.status(500).json({ message: 'Error fetching DO_Devise', error: err });
  }
};

export const getAllDepot = async (req, res) => {
  console.log('Controller: Fetching Depot');
  try {
    const data = await daModel.getAllDepot();
    console.log('Controller: Fetched Depot:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching Depot:', err);
    res.status(500).json({ message: 'Error fetching depot', error: err });
  }
};

export const getExpedition = async (req, res) => {
  console.log('Controller: Fetching Expedition');
  try {
    const data = await daModel.getExpedition();
    console.log('Controller: Fetched Expedition:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching Expedition:', err);
    res.status(500).json({ message: 'Error fetching expedition', error: err });
  }
};

export const getAllAffaire = async (req, res) => {
  console.log('Controller: Fetching Affaire');
  try {
    const data = await daModel.getAllAffaire();
    console.log('Controller: Fetched Affaire:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching Affaire:', err);
    res.status(500).json({ message: 'Error fetching Affaire', error: err });
  }
};

export const getTaxe = async (req, res) => {
  console.log('Controller: Fetching Taxe');
  try {
    const data = await daModel.getTaxe();
    console.log('Controller: Fetched Taxe:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching Taxe:', err);
    res.status(500).json({ message: 'Error fetching taxe', error: err });
  }
};

export const getAllEU_Enumere = async (req, res) => {
  console.log('Controller: Fetching EU_Enumere');
  try {
    const data = await daModel.getAllEU_Enumere();
    console.log('Controller: Fetched EU_Enumere:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching EU_Enumere:', err);
    res.status(500).json({ message: 'Error fetching EU_Enumere', error: err });
  }
};

export const getAllDemandeur = async (req, res) => {
  console.log('Controller: Fetching Demandeur');
  try {
    const data = await daModel.getAllDemandeur();
    console.log('Controller: Fetched Demandeur:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching Demandeur:', err);
    res.status(500).json({ message: 'Error fetching demandeur', error: err });
  }
};


export const articlesDemander = async (req, res) => {
  console.log('Controller: Fetching Articles Demander');
  try {
    const data = await daModel.getArticlesDemander();
    console.log('Controller: Fetched Articles Demander:', data);
    res.json(data);
  } catch (err) {
    console.log('Controller: Error fetching Articles Demander:', err);
    res.status(500).json({ message: 'Error fetching Articles Demander', error: err.message });
  }
};
