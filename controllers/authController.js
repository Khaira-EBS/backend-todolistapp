const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // periksa username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // password required
    if (!password) {
      return res.status(400).json({ message: 'Password cannot be empty' });
    }

    // hash pass
    const hashedPassword = bcrypt.hashSync(password, 10);

    // tambah akun baru
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        // cari akun berdasarkan username
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: 'Invalid username' });
        }
    
        // periksa password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }
    
        // buat dan kirim token JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

module.exports = { register, login };
