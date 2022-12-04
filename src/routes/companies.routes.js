import express from 'express';
const router = express.Router();

import {getCompanies,createCompany} from '../controllers/companiesController'

router.get('/', getCompanies);
router.post('/add',createCompany);


export default router;