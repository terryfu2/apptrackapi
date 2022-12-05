import express from 'express';
const router = express.Router();

import {getApplications,createApplications,getApplicationByStudent,updateApplication} from '../controllers/applicationController'

router.get('/', getApplications); 
router.post('/add', createApplications);
router.get('/applications/:sEmail', getApplicationByStudent);
router.put('/edit/:applicationid', updateApplication); 

export default router;