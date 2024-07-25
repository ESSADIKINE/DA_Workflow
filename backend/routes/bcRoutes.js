import express from 'express';
import {
    getAllBCInDetails,
    getAllBCInBrief,
    editBC,
    editDL,
    editBCStatutByAcheteur,
    editBCStatutByDG,
    searchBC,
    searchDL,
    getBCByStatut,
    deleteDocLigne,
    transformDaToBc,
    updateBCTypeAndStatut
} from '../controllers/bcController.js';

const router = express.Router();

router.get('/bc/details', getAllBCInDetails);
router.get('/bc/brief', getAllBCInBrief);
router.put('/bc/:id', editBC);
router.put('/bcl/:doPiece/:dlLigne', editDL);
router.put('/bc/statut/acheteur/:id', editBCStatutByAcheteur);
router.put('/bc/statut/dg/:id', editBCStatutByDG);
router.get('/bc/search', searchBC);
router.get('/dl/search', searchDL);
router.get('/bc/statut', getBCByStatut);
router.delete('/dl/:doPiece/:dlLigne', deleteDocLigne);

router.put('/pc/transform/:doPiece', transformDaToBc);
router.put('/bc/transform/:doPiece', updateBCTypeAndStatut);

export default router;
