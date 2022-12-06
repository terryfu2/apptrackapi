import express from "express";
const router = express.Router();

import {
  getStudents,
  getMe,
  createNewStudent,
  updateStudent,
} from "../controllers/studentsController";

router.get("/", getStudents);
router.get("/me", getMe);
router.post("/add", createNewStudent);
router.put("/edit", updateStudent);

export default router;
