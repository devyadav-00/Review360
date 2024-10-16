import express from "express";
const router = express.Router(); 
import { employeeLogin, employeeRegister, employeeLogout, userData, getManagers, getTeamMembers, employeeUpdateProfile } from "../controller/userController.js";
import { upload } from "../middlewares/multer.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

router.post("/signup", upload.single('image'), employeeRegister);
router.post("/login", employeeLogin);
router.post('/logout', authenticateUser, employeeLogout);
router.get('/profile', authenticateUser, userData);
router.get('/managers', getManagers);
router.get('/teamMembers', authenticateUser, getTeamMembers);
router.put('/updateProfile', authenticateUser, upload.single('image'), employeeUpdateProfile);

export default router;