import express from "express";
const router = express.Router();

import {
  getApplications,
  createApplications,
  getApplicationByStudent,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController";

router.get("/", getApplications);
router.post("/add", createApplications);
//router.get('/applications/:sEmail', getApplicationByStudent);
router.put("/edit/:applicationid", updateApplication);
router.get("/me", getApplicationByStudent);
router.delete("/delete/:applicationid", deleteApplication);

export default router;
