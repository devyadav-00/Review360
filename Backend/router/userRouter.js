import express from "express";
const router = express.Router(); 
import {employeeLogin, employeeRegister} from "../controller/userController.js"

router.post("/signup", employeeRegister);
router.post("/login", employeeLogin);

export default router;