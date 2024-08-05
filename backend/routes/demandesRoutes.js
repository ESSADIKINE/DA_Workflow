import express from 'express';
import {
  createDemande,
  getDemandes,
  getDemandeBySearch,
  updateDemande,
  deleteDemande,
  articlesBySelection,
} from '../controllers/demandesController.js';

const router = express.Router();

router.route('/demandes').get(getDemandes).post(createDemande);
router.route('/demandes/:id').put(updateDemande).delete(deleteDemande);
router.get('/demandes/search', getDemandeBySearch);
router.get('/demandes/selection', articlesBySelection);

export default router;
