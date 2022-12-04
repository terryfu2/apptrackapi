import express from 'express';
const router = express.Router();

import { getAdminByEmails} from '../controllers/adminsController'

router.get('/email/:email', getAdminByEmails);


export default router;