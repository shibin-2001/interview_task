

const express = require('express')
const router = express.Router();
const {login} = require('../controllers/User/login.js');
const { register } = require('../controllers/User/register.js');
const { verifyToken } = require('../middleware/auth.js');
const { addCourse } = require('../controllers/Course/addCourses.js');
const { getCourse } = require('../controllers/Course/getCourses.js');
const { updateCourse } = require('../controllers/Course/updateCourses.js');
const { deleteCourse } = require('../controllers/Course/deleteCourses.js');
// READ

router.post('/add_course',verifyToken,addCourse)
router.get('/get_course',verifyToken,getCourse)
router.post('/update_course/:id',verifyToken,updateCourse)
router.post('/delete_course/:id',verifyToken,deleteCourse)

module.exports = router