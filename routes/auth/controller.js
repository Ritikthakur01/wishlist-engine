import User from './model';
import bcrypt from 'bcrypt';
import { generateToken } from '../../middelwares/jwt';


export const registerUser = async (req, res) => {
  try {
    const { name,email, password } = req.body;
    const user = new User({ name,email, password });
    await user.save();
    return res.status(201).json({ flag:1,message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({flag:0, error:error.message});
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, pwd } = req.body;

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(404).json({flag:0, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(pwd, user.password);
    if (!isMatch) {
      return res.status(400).json({flag:0, message: 'Invalid credentials' });
    }

    const { password, ...rest } = user

    const token = generateToken(rest)

    return res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    return res.status(500).json({flag:0, error:error.message});
  }
};