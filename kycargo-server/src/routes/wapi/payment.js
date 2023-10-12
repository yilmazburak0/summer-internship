import express from 'express';
import {paymentSearch, getPayment, makePayment, discardPayment, createPaymentTest} from 'controllers/payment';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(paymentSearch);
router.route('/makePayment').post(makePayment);
router.route('/discardPayment').post(discardPayment);
router.route('/:id').get(getPayment);
router.route('/').post(createPaymentTest);

export default router;
