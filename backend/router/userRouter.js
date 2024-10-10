import express from "express";
const router = express.Router(); 
import { employeeLogin, employeeRegister, employeeLogout, userData, getManagers, getTeamMembers } from "../controller/userController.js";
import { upload } from "../middlewares/multer.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

router.post("/signup", upload.single('image'), employeeRegister);
router.post("/login", employeeLogin);
router.post('/logout', authenticateUser, employeeLogout);
router.get('/profile', authenticateUser, userData);
router.get('/managers', getManagers);
router.get('/teamMembers', authenticateUser, getTeamMembers);

export default router;