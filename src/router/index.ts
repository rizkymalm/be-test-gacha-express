import express from "express";
import { getIndex } from "../controllers/index.ts";

const router = express.Router();

router.get("", getIndex);

export default router;
