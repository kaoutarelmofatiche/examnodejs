const express = require('express');
const router = express.Router();

const productValidation = require('../middlewares/productValidation');
const productController = require('../controllers/productController');

router.post('/', productValidation, productController.createProduct);
router.put('/:id', productValidation, productController.updateProduct);
// On a pas besoin de valdier les données ici
router.get('/:id', productController.readProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
