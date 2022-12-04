import express from 'express';
const router = express.Router();

import { getStudents,getStudentByEmails,createNewStudent} from '../controllers/studentsController'

router.get('/', getStudents); 
router.get('/email/:email', getStudentByEmails); 
router.post('/add', createNewStudent);

export default router;