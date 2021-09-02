const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.post('/trash/handle-form-actions',courseController.trashHandleFormActions)
router.post('/handle-form-actions',courseController.handleFormActions)
router.get('/:id/edit',courseController.edit);
router.put('/:id',courseController.update);
router.patch('/:id/restore',courseController.restore);
router.delete('/:id',courseController.destroy);
router.delete('/:id/force',courseController.forceDestroy);
router.post('/store',courseController.store);
router.get('/create',courseController.create);




router.get('/', courseController.index);

module.exports = router;