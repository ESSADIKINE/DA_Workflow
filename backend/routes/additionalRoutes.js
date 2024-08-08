import express from 'express';
import {
  getCollaborateur,
  getAllCT_Num,
  getDO_Devise,
  getAllDepot,
  getExpedition,
  getAllCA_Intitule,
  getTaxe,
  getAllEU_Enumere,
  getAllDemandeur,
  articlesDemander
} from './controllers/additionalController';

const router = express.Router();

router.get('/CO_No', getCollaborateur);
router.get('/CT_Num', getAllCT_Num);
router.get('/DO_Devise', getDO_Devise);
router.get('/DE_No', getAllDepot);
router.get('/DO_Expedit', getExpedition);
router.get('/CA_Num', getAllCA_Intitule);
router.get('/DL_Taxe1', getTaxe);
router.get('/EU_Enumere', getAllEU_Enumere);
router.get('/Demandeur', getAllDemandeur);
router.get('/Design', articlesDemander);

export default router;
