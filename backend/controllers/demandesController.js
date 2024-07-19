import Demande from '../models/demandesModel.js';
import connectMongo from '../config/dbmongo.js';

connectMongo(); // Ensure MongoDB is connected before handling requests

export const createDemande = async (req, res) => {
  try {
    const { AR_Ref, AR_Design, AR_Qty, description, Demande_statut } = req.body;
    const newDemande = new Demande({
      AR_Ref,
      AR_Design,
      AR_Qty,
      description,
      Demande_statut,
    });
    const savedDemande = await newDemande.save();
    res.status(201).json(savedDemande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDemandes = async (req, res) => {
  try {
    const demandes = await Demande.find();
    res.status(200).json(demandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDemandeBySearch = async (req, res) => {
  try {
    const { AR_Ref, AR_Design } = req.query;

    const query = {};
    if (AR_Ref) query.AR_Ref = { $regex: AR_Ref, $options: 'i' };
    if (AR_Design) query.AR_Design = { $regex: AR_Design, $options: 'i' };

    const demandes = await Demande.find(query);
    if (demandes.length === 0) {
      return res.status(404).json({ message: 'No demandes found' });
    }
    res.status(200).json(demandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDemande = await Demande.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDemande) {
      return res.status(404).json({ message: 'Demande not found' });
    }
    res.status(200).json(updatedDemande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDemande = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDemande = await Demande.findByIdAndDelete(id);
    if (!deletedDemande) {
      return res.status(404).json({ message: 'Demande not found' });
    }
    res.status(200).json({ message: 'Demande deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};