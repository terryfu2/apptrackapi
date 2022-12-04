import express from 'express';
const router = express.Router();

import {getJobs,getJobsById,getJobsByLocation,createNewJob,getJobsByCategory,getJobsByCompany } from '../controllers/jobsController'

router.get('/', getJobs);
router.get('/id/:id', getJobsById); 
router.get('/location/:location', getJobsByLocation);
router.post('/add',createNewJob);
router.get('/category/:categoryName',getJobsByCategory);
router.get('/company/:companyName',getJobsByCompany);

export default router;