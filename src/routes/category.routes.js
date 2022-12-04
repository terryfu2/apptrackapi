import express from 'express';
const router = express.Router();

import {getCategories,createCategory} from '../controllers/categoriesController'

router.get('/', getCategories);
router.post('/add',createCategory);


export default router;