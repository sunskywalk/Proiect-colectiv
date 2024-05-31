const express = require('express');
const { register, login, confirmEmail, changePassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/confirm/:token', confirmEmail);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
// In authRoutes.js
console.log({ register, login, confirmEmail, changePassword });
