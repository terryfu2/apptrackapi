import express from "express";
const router = express.Router();

import { isAdmin } from "../controllers/adminsController";

router.get("/me", isAdmin);

export default router;
