import express from 'express';
import {
    getAllDAInDetails,
    getAllDAInBrief,
    addNewDA,
    editDA,
    editDAStatutByAcheteur,
    editDAStatutByDG,
    searchDA,
    getDAByStatut
} from '../controllers/daController.js';

const router = express.Router();

router.get('/da/details', getAllDAInDetails);
router.get('/da/brief', getAllDAInBrief);
router.post('/da', addNewDA);
router.put('/da/:id', editDA);
router.put('/da/statut/acheteur/:id', editDAStatutByAcheteur);
router.put('/da/statut/dg/:id', editDAStatutByDG);
router.get('/da/search', searchDA);
router.get('/da/statut', getDAByStatut);

export default router;
