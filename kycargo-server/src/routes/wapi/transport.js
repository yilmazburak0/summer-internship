import express from 'express';
import {getTransport, createTransport, updateTransport, deleteTransport, searchTransport} from 'controllers/transport';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(searchTransport);
router.route('/getTransport').get(getTransport)
router.route('/:id').delete(deleteTransport);
router.route('/').put(updateTransport).post(createTransport);

export default router;
