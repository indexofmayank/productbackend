const router = require('express').Router();
const categoryController = require('../controllers/CategoryController');


router.route('/').post(categoryController.createCategory);
router.route('/').get(categoryController.getAllCategory);
router.route('/:id').get(categoryController.getCategoryById);
router.route('/:id').delete(categoryController.deleteCategoryById);
router.route('/:id').put(categoryController.updateCategoryById);


module.exports = router;