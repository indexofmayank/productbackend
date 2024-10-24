const router = require('express').Router();
const productController = require('../controllers/ProductController');


router.route('/').post(productController.createProduct);
router.route('/table/').get(productController.getAllProducts);
router.route('/:id').get(productController.getProductById);
router.route('/:id').delete(productController.deleteProductById);
router.route('/:id').put(productController.updateProductById);

module.exports = router;
