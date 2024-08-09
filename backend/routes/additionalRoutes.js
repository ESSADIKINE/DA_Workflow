import express from 'express';
import {
  getCollaborateur,
  getAllCT_Num,
  getDO_Devise,
  getAllDepot,
  getExpedition,
  getAllAffaire,
  getTaxe,
  getAllEU_Enumere,
  getAllDemandeur,
  articlesDemander,
} from '../controllers/additionalController.js';

const router = express.Router();

router.get('/collaborateur', getCollaborateur);
router.get('/ct_num', getAllCT_Num);          
router.get('/do_devise', getDO_Devise);       
router.get('/depot', getAllDepot);            
router.get('/expedition', getExpedition);     
router.get('/affaire', getAllAffaire);
router.get('/taxe', getTaxe);                 
router.get('/eu_enumere', getAllEU_Enumere);  
router.get('/demandeur', getAllDemandeur);    
router.get('/design', articlesDemander);

export default router;
