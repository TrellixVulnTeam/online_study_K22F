const express = require('express');
const router = express.Router();
const courseDetailController = require('../app/controllers/CourseDetailController');
const loginMiddleWare = require('../app/controllers/LoginMiddleWare');

router.post('/:term/:slug/trash/handle-form-actions',loginMiddleWare.login,courseDetailController.trashHandleFormActions);
router.post('/:term/:slug/handle-form-actions',courseDetailController.handleFormActions);

router.get('/:term/:slug/trash',loginMiddleWare.login,courseDetailController.trash);
router.post('/:term/:slug/trash',loginMiddleWare.postlogin,courseDetailController.trash);

router.patch('/:term/:slug/:id/restore',courseDetailController.restore);
router.delete('/:term/:slug/:id/force',courseDetailController.deleteForce);

router.get('/:term/:slug/:id/edit',courseDetailController.edit);
router.post('/:term/:slug/:id/edit',courseDetailController.edit);

router.put('/:term/:slug/:id',courseDetailController.update);
router.delete('/:term/:slug/:id',courseDetailController.destroy);

router.get('/:term/:slug/createDetail',loginMiddleWare.login,courseDetailController.createDetail);
router.post('/:term/:slug/createDetail',loginMiddleWare.postlogin,courseDetailController.createDetail);

router.get('/:term/:slug/storeCourseDetail',loginMiddleWare.login,courseDetailController.storeCourseDetail);
router.post('/:term/:slug/storeCourseDetail',loginMiddleWare.postlogin,courseDetailController.storeCourseDetail);

router.post('/:term/:slug/store',courseDetailController.store);
router.get('/:term/:slug',courseDetailController.show);

router.get('/:term',courseDetailController.term);

module.exports = router;