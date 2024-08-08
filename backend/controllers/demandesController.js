import {
  createDemandeInDB,
  getDemandesFromDB,
  getDemandeBySearchInDB,
  updateDemandeInDB,
  deleteDemandeInDB,
  getArticlesInSelection,
  refuseDemandeInDB
} from '../models/demandesModel.js';

export const createDemande = async (req, res) => {
  try {
    console.log('Received request to create demande:', req.body);
    const { AR_Ref, AR_Design, Qty, description, Demande_statut } = req.body;
    const email = req.user.Email;
    const newDemande = await createDemandeInDB({
      AR_Ref,
      AR_Design,
      Qty,
      description,
      Demande_statut,
      email,
    });
    res.status(201).json({
      status: 'success',
      data: newDemande,
    });
  } catch (err) {
    console.log(`CREATE DEMANDE: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getDemandes = async (req, res) => {
  try {
    const demandes = await getDemandesFromDB();
    res.status(200).json({
      status: 'success',
      data: demandes,
    });
  } catch (err) {
    console.log(`GET DEMANDES: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getDemandeBySearch = async (req, res) => {
  try {
    const { AR_Ref, AR_Design } = req.query;
    const demandes = await getDemandeBySearchInDB(AR_Ref, AR_Design);
    res.status(200).json({
      status: 'success',
      data: demandes,
    });
  } catch (err) {
    console.log(`SEARCH DEMANDE: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const demande = req.body;
    const updatedDemande = await updateDemandeInDB(id, demande);
    res.status(200).json({
      status: 'success',
      data: updatedDemande,
    });
  } catch (err) {
    console.log(`UPDATE DEMANDE: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteDemandeInDB(id);
    res.status(204).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    console.log(`DELETE DEMANDE: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const articlesBySelection = async (req, res) => {
  try {
    const { key } = req.query;
    console.log('Received key:', key);
    const articles = await getArticlesInSelection(key);
    console.log('Fetched articles:', articles);
    res.status(200).json({
      status: 'success',
      data: articles,
    });
  } catch (err) {
    console.log(`SEARCH ARTICLE: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const refuseDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const refusedDemande = await refuseDemandeInDB(id);
    res.status(200).json({
      status: 'success',
      data: refusedDemande,
    });
  } catch (err) {
    console.log(`REFUSE DEMANDE: ${err.message}`);
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};
