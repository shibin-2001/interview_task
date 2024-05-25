

const express = require('express')
const router = express.Router();

const { verifyToken } = require('../middleware/auth.js');
const { addStudent } = require('../controllers/Student/addStudent.js');
const { deleteStudent } = require('../controllers/Student/deleteStudent.js');
const { updateStudent } = require('../controllers/Student/updateStudent.js');
const { getStudent } = require('../controllers/Student/getStudent.js');
const { toggleActiveStudent } = require('../controllers/Student/toggleActiveStudent.js');
// READ

router.get('/get_student',verifyToken,getStudent)
router.post('/add_student',verifyToken,addStudent)
router.post('/delete_student/:id',verifyToken,deleteStudent)
router.post('/update_student/:id',verifyToken,updateStudent)
router.post('/set_active/:id',verifyToken,toggleActiveStudent)

module.exports = router