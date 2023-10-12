import express from 'express';
import { createItems } from 'controllers/tbInvoice';
import { apiProtect } from 'middleware/auth';

const router = express.Router();

router.use(apiProtect);
//router.route('/search').post(searchProduct);
// router.route('/requestApproval').post(requestApproval);

// router.route('/:id').get(getProduct).delete(deleteProduct).put(updateProduct);
router.route('/').post(createItems);

export default router;
