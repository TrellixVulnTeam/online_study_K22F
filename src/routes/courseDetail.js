const express = require('express');
const router = express.Router();
const courseDetailController = require('../app/controllers/CourseDetailController');

router.post('/:term/:slug/trash/handle-form-actions',courseDetailController.trashHandleFormActions);
router.post('/:term/:slug/handle-form-actions',courseDetailController.handleFormActions);

router.get('/:term/:slug/trash',courseDetailController.trash);
router.patch('/:term/:slug/:id/restore',courseDetailController.restore);
router.delete('/:term/:slug/:id/force',courseDetailController.deleteForce);

router.get('/:term/:slug/:id/edit',courseDetailController.edit);
router.put('/:term/:slug/:id',courseDetailController.update);
router.delete('/:term/:slug/:id',courseDetailController.destroy);

router.get('/:term/:slug/createDetail',courseDetailController.createDetail);
router.get('/:term/:slug/storeCourseDetail',courseDetailController.storeCourseDetail);
router.post('/:term/:slug/store',courseDetailController.store);
router.get('/:term/:slug',courseDetailController.show);

router.get('/:term',courseDetailController.term);

module.exports = router;