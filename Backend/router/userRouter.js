import express from "express";
const router = express.Router(); 
import { employeeLogin, employeeRegister, employeeLogout } from "../controller/userController.js";
import { upload } from "../middlewares/multer.js";

router.post("/signup", upload.single('file'), employeeRegister);
router.post("/login", employeeLogin);
router.post('/logout', employeeLogout);

export default router;