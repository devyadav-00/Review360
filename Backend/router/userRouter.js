import express from "express";
const router = express.Router(); 
import { employeeLogin, employeeRegister } from "../controller/userController.js";
import { upload } from "../middlewares/multer.js";

router.post("/signup", upload.single('file'), employeeRegister);
router.post("/login", employeeLogin);

export default router;