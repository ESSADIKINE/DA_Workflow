import {
    getAllBCInDetailsFromDB,
    getAllBCInBriefFromDB,
    updateBCStatutByAcheteurInDB,
    updateBCStatutByDGInDB,
    searchBCInDB,
    searchDLInDB,
    getBCByStatutFromDB,
    deleteDocLigneInDB,
    transformDaToBcInDB,
    updateBCTypeAndStatutInDB
} from '../models/bcModel.js';
import {
    updateDAInDB,
    updateDocLigneInDB,
} from '../models/daModel.js';


export const getAllBCInDetails = async (req, res) => {
    try {
        const bcs = await getAllBCInDetailsFromDB();
        res.status(200).json({
            status: 'success',
            data: {
                bcs,
            },
        });
    } catch (err) {
        console.log(`GET ALL BC IN DETAILS: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getAllBCInBrief = async (req, res) => {
    try {
        const bcs = await getAllBCInBriefFromDB();
        res.status(200).json({
            status: 'success',
            data: {
                bcs,
            },
        });
    } catch (err) {
        console.log(`GET ALL BC IN BRIEF: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};


export const editBC = async (req, res) => {
    try {
        const { id } = req.params;
        const bc = req.body;

        const result = await updateDAInDB(id, bc);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'BC updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE BC: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const editDL = async (req, res) => {
    const { doPiece, dlLigne } = req.params;
    const updatedArticle = req.body;

    try {
        const result = await updateDocLigneInDB(doPiece, dlLigne, updatedArticle);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Doc Ligne updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE Doc Ligne: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const editBCStatutByAcheteur = async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        // Check if the statut is "Envoyé"
        if (statut === 'Envoyé') {
            const result = await updateBCStatutByAcheteurInDB(id, statut);
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'BC statut by acheteur updated successfully',
                    result,
                },
            });
        } else {
            // If the statut is not "Envoyé", return a 400 status code
            res.status(400).json({
                status: 'fail',
                message: 'Invalid statut. The statut must be "Envoyé".',
            });
        }
    } catch (err) {
        console.log(`UPDATE BC STATUT BY ACHETEUR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const editBCStatutByDG = async (req, res) => {
    try {
        const { id } = req.params;
        const { statut } = req.body;

        if (statut === 'Saisie' || statut === 'Confirmé' || statut === 'Refusé') {
            const result = await updateBCStatutByDGInDB(id, statut);
            res.status(200).json({
                status: 'success',
                data: {
                    message: 'BC statut by DG updated successfully',
                    result,
                },
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid statut. The statut must be "Saisie", "Confirmé" or "Refusé".',
            });
        }
    } catch (err) {
        console.log(`UPDATE BC STATUT BY DG: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const searchBC = async (req, res) => {
    try {
        const { key } = req.query;
        const bcs = await searchBCInDB(key);
        res.status(200).json({
            status: 'success',
            data: {
                bcs,
            },
        });
    } catch (err) {
        console.log(`SEARCH BC: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const searchDL = async (req, res) => {
    try {
        const { key } = req.query;
        const doclignes = await searchDLInDB(key);
        res.status(200).json({
            status: 'success',
            data: {
                doclignes,
            },
        });
    } catch (err) {
        console.log(`SEARCH DL: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getBCByStatut = async (req, res) => {
    try {
        const { statut } = req.query;
        const bcs = await getBCByStatutFromDB(statut);
        res.status(200).json({
            status: 'success',
            data: {
                bcs,
            },
        });
    } catch (err) {
        console.log(`GET BC BY STATUT: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const deleteDocLigne = async (req, res) => {
    const { doPiece, dlLigne } = req.params;

    try {
        const result = await deleteDocLigneInDB(doPiece, dlLigne);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Doc Ligne deleted successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`DELETE DOCLIGNE: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const transformDaToBc = async (req, res) => {
    const { doPiece } = req.params;

    try {
        const result = await transformDaToBcInDB(doPiece);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'DA transformed to BC successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`TRANSFORM DA TO BC: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const updateBCTypeAndStatut = async (req, res) => {
    const { doPiece } = req.params;

    try {
        const result = await updateBCTypeAndStatutInDB(doPiece);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'BC type and statut updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE BC TYPE AND STATUT: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};
