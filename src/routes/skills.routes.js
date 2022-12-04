import express from 'express';
const router = express.Router();

import {getSkillsFromJob,createSkill,getSkillsAll,createAllSkill } from '../controllers/skillsController'

router.get('/job/:jobid', getSkillsFromJob);
router.post('/add',createSkill);
router.post('/all/add',createAllSkill)  
router.get('/all' ,getSkillsAll);


export default router;