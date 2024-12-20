import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js"; 

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);  
router.post("/logout", logout);

export default router;
//Ztm6NeTQc8lN6moD
//sammamabdullahalsuhaimee
//mongodb+srv://sammamabdullahalsuhaimee:Ztm6NeTQc8lN6moD@cluster0.lmxir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0