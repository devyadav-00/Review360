import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticateUser = async (req, res, next) => {
    const {token} = req.cookies || req.body;

  if (token) {
    try
    {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(payload._id).select('-password');

      if (req.user.managed_by !== null) {
        const manager = await User.findById(req.user.managed_by).select('firstname lastname _id');
        req.user.managed_by = manager;
      }  
    

      // req.user = payload;
      
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }
      next();
    }
    catch (error)
    {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  }
  else
  {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
};



const authorizeEmployer = (req, res, next) => {
  if (req.user.role !== 'Manager') {
    return res.status(403).json({ message: "Access denied. Only employers can view all ratings." });
  }
  next();
};



export {
  authenticateUser,
  authorizeEmployer
}