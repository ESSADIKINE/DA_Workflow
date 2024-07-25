import express from 'express';
import {
    getAllBCInDetails,
    getAllBCInBrief,
    addNewBC,
    editBC,
    editDL,
    editBCStatutByAcheteur,
    editBCStatutByDG,
    searchBC,
    searchDL,
    getBCByStatut
} from '../controllers/bcController.js';

const router = express.Router();

router.get('/bc/details', getAllBCInDetails);
router.get('/bc/brief', getAllBCInBrief);
router.put('/bc', TransformDaToBC);
router.put('/bc/statut/acheteur/:id', editBCStatutByAcheteur);
router.put('/bc/statut/dg/:id', editBCStatutByDG);
router.get('/bc/search', searchBC);
router.get('/dl/search', searchDL);
router.get('/bc/statut', getBCByStatut);

export default router;