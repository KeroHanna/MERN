import { Router } from 'express';
const router = Router();

import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from '../controllers/jobController.js';

import {
  validateJobInput,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

//router.get('/',getAllJobs)
//router.post('/',createJob)

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route('/stats').get(showStats);
router
  .route('/:id')
  .get(validateIdParam, getSingleJob)
  .delete(checkForTestUser, validateIdParam, deleteJob)
  .patch(checkForTestUser, validateJobInput, updateJob);

export default router;
