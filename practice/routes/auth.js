const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { uploadProfilePic } = require('../middleware/upload');

const router = express.Router();

router.post('/register', uploadProfilePic.single('profilePic'), async (req, res,) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role, profilePic: req.file ? req.file.path : '' });

    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'error registering the user', error: err.message });
  }
});

router.post('/login', async (req, res,) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic || '',
      },
    });

  } catch (err) {
    res.status(500).json({ message: 'Error Logging in ', error: err.message });
  }
});



module.exports = router;
