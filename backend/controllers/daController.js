import {

    addNewDAInDB,
} from '../models/daModel.js';

export const getAllDAInDetails = async (req, res) => {
    try {
        const das = await getAllDAInDetailsFromDB();
        res.status(200).json({
            status: 'success',
            data: {
                das,
            },
        });
    } catch (err) {
        console.log(`GET ALL DA IN DETAILS: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getAllDAInBrief = async (req, res) => {
    try {
        const das = await getAllDAInBriefFromDB();
        res.status(200).json({
            status: 'success',
            data: {
                das,
            },
        });
    } catch (err) {
        console.log(`GET ALL DA IN BRIEF: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const addNewDA = async (req, res) => {
    try {
        const newDA = req.body.da;
        const articles = req.body.articles;
        

        const result = await addNewDAInDB(newDA, articles);
        res.status(201).json({
            status: 'success',
            data: {
                message: 'DA and articles added successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`ADD NEW DA: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const editDA = async (req, res) => {
    try {
        const { id } = req.params;
        const da = req.body;

        const result = await updateDAInDB(id, da);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'DA updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE DA: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const editDAStatutByAcheteur = async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        const result = await updateDAStatutByAcheteurInDB(id, statut);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'DA statut by acheteur updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE DA STATUT BY ACHETEUR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const editDAStatutByDG = async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        const result = await updateDAStatutByDGInDB(id, statut);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'DA statut by DG updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE DA STATUT BY DG: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const searchDA = async (req, res) => {
    try {
        const { key } = req.query;
        const das = await searchDAInDB(key);
        res.status(200).json({
            status: 'success',
            data: {
                das,
            },
        });
    } catch (err) {
        console.log(`SEARCH DA: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getDAByStatut = async (req, res) => {
    try {
        const { statut } = req.query;
        const das = await getDAByStatutFromDB(statut);
        res.status(200).json({
            status: 'success',
            data: {
                das,
            },
        });
    } catch (err) {
        console.log(`GET DA BY STATUT: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};
