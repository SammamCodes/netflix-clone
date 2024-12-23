import express from "express";
import { signup, login, logout, authCheck } from "../controllers/auth.controller.js";
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);  
router.post("/logout", logout);
router.get("/authCheck", protectRoute   , authCheck);

export default router;

//Ztm6NeTQc8lN6moD
//sammamabdullahalsuhaimee
//mongodb+srv://sammamabdullahalsuhaimee:Ztm6NeTQc8lN6moD@cluster0.lmxir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0