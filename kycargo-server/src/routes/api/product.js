import express from 'express';
import {searchProduct} from 'controllers/product';
import {apiProtect, protect} from 'middleware/auth';

const router = express.Router();

router.use(apiProtect);
router.route('/search').post(searchProduct);
// router.route('/requestApproval').post(requestApproval);

// router.route('/:id').get(getProduct).delete(deleteProduct).put(updateProduct);
// router.route('/').post(createProduct);

export default router;
