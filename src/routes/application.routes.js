import express from 'express';
const router = express.Router();

import {getApplications,createApplications,getApplicationByStudent} from '../controllers/applicationController'

router.get('/', getApplications); 
router.post('/add', createApplications);
router.get('/applications/:sEmail', getApplicationByStudent);

export default router;