import express from "express";
import { test } from "../controllers/user.controller.js"

const router = express.Router();

// create a test api
const userRoutes = router.get("/test", test);

export default router;
