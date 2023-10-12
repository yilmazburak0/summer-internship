import express from 'express';
import { searchTbInvoice } from 'controllers/tbInvoice';
import { protect } from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(searchTbInvoice);

// router.route('/:id').get(getOrderById).delete(deleteOrder);
// router.route('/').post(createOrder).put(updateOrder);

export default router;
