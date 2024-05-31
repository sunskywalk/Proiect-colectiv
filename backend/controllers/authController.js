const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = 'your_jwt_secret_key';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    const url = `http://localhost:5000/auth/confirm/${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Confirm your email',
      html: `Click <a href="${url}">here</a> to confirm your email.`,
    });
    res.status(201).send('User registered, please check your email to confirm.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user.');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(400).send('Invalid username or password.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid username or password.');
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
};

exports.confirmEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    await User.update({ confirmed: true }, { where: { id: decoded.userId } });
    res.send('Email confirmed, you can now login.');
  } catch (error) {
    res.status(400).send('Invalid or expired token.');
  }
};

exports.changePassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(userId);
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid old password.');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.send('Password changed successfully.');
};
