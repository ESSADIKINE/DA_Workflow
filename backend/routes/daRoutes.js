import express from 'express';
import {
    getAllDAInDetails,
    getAllDAInBrief,
    addNewDA,
    editDA,
    editDL,
    editDAStatutByAcheteur,
    editDAStatutByDG,
    searchDA,
    searchDL,
    getDAByStatut,
    deleteDocLigne
} from '../controllers/daController.js';

const router = express.Router();

router.get('/da/details', getAllDAInDetails);
router.get('/da/brief', getAllDAInBrief);
router.post('/da', addNewDA);
router.put('/da/:id', editDA);
router.put('/dl/:doPiece/:dlLigne', editDL);
router.put('/da/statut/acheteur/:id', editDAStatutByAcheteur);
router.put('/da/statut/dg/:id', editDAStatutByDG);
router.get('/da/search', searchDA);
router.get('/dl/search', searchDL);
router.get('/da/statut', getDAByStatut);

router.delete('/dl/:doPiece/:dlLigne', deleteDocLigne); // New delete route


export default router;
