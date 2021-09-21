const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');
const loginMiddleWare = require('../app/controllers/LoginMiddleWare');
const checkCookies = require('../app/controllers/CheckCookies');
const clientController = require('../app/controllers/ClientController');


router.post('/trash/handle-form-actions',courseController.trashHandleFormActions)
router.post('/handle-form-actions',courseController.handleFormActions)
router.get('/:id/edit',courseController.edit);
router.put('/:id',courseController.update);
router.patch('/:id/restore',courseController.restore);
router.delete('/:id',courseController.destroy);
router.delete('/:id/force',courseController.forceDestroy);
router.post('/store',courseController.store);


router.get('/create',loginMiddleWare.login,courseController.create);
router.post('/create',loginMiddleWare.postlogin,courseController.create);

router.post('/',clientController.findCourse,courseController.search);





router.get('/',clientController.findCourse,courseController.index);

module.exports = router;