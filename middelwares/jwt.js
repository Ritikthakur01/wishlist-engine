import jwt from 'jsonwebtoken';
import { generateDynamicSecretKey } from '../utils/constants/generateDynamicSecretKey';

let currentSecretKey = generateDynamicSecretKey();

export const generateToken = (user) => {
  const token = jwt.sign(
    { user: { ...user } },
    currentSecretKey,
    { expiresIn: "1h" }
  );
  return token;
};

export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(201).json({   
      success: false,
      message: "Unauthorized: Missing token",
    });
  }

  try {
    const decoded = jwt.verify(token, currentSecretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};