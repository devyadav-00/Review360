import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;

  if (token) {
    try
    {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(payload._id).select('-password');

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

export {
    authenticateUser
}