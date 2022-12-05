import express from 'express';
const router = express.Router();

import { getStudents,getStudentByEmails,createNewStudent,updateStudent} from '../controllers/studentsController'

router.get('/', getStudents); 
router.get('/email/', getStudentByEmails); 
router.post('/add', createNewStudent);
router.put('/edit', updateStudent);

export default router;