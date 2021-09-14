const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');
const loginMiddleWare = require('../app/controllers/LoginMiddleWare');

router.get('/stored/course',loginMiddleWare.login,meController.storedCourse);
router.post('/stored/course',loginMiddleWare.postlogin,meController.storedCourse);

router.get('/trash/course',meController.trashCourse);


module.exports = router;