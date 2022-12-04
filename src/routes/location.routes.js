import express from 'express';
const router = express.Router();

import {getLocations,createLocation} from '../controllers/locationsController'

router.get('/', getLocations);
router.post('/add',createLocation);


export default router;