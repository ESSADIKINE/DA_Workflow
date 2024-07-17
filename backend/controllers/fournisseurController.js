import { getAllFournisseursFromDB, searchFournisseurFromDB, getFournisseurByARDesignFromDB } from '../models/fournisseurModel.js';

export const getAllFournisseurs = async (req, res) => {
    try {
        const fournisseurs = await getAllFournisseursFromDB();
        res.status(200).json({
            status: 'success',
            data: {
                fournisseurs,
            },
        });
    } catch (err) {
        console.log(`GET FOURNISSEURS: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const searchFournisseur = async (req, res) => {
    try {
        const { key } = req.query;
        const fournisseurs = await searchFournisseurFromDB(key);
        res.status(200).json({
            status: 'success',
            data: {
                fournisseurs,
            },
        });
    } catch (err) {
        console.log(`SEARCH FOURNISSEUR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getFournisseurByARDesign = async (req, res) => {
    try {
        const { AR_Design } = req.query;
        const fournisseurs = await getFournisseurByARDesignFromDB(AR_Design);
        res.status(200).json({
            status: 'success',
            data: {
                fournisseurs,
            },
        });
    } catch (err) {
        console.log(`GET FOURNISSEUR BY AR_DESIGN: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};
