


const express = require('express')
const router = express.Router();
const {login} = require('../controllers/User/login.js');
const { register } = require('../controllers/User/register.js');
const { verifyToken } = require('../middleware/auth.js');
// READ

router.post('/register',verifyToken,register)
router.post('/login',login)

module.exports = router