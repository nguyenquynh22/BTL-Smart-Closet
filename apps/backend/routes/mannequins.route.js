const express = require('express');
const controller = require('../controllers/mannequins.controller');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single('image'), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
