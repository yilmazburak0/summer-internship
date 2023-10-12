import express from 'express';
import {getProduct, createProduct, updateProduct, deleteProduct, searchProduct} from 'controllers/product';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(searchProduct);
router.route('/:id').get(getProduct).delete(deleteProduct);
router.route('/').put(updateProduct).post(createProduct);

export default router;
