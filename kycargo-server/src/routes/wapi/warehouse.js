import express from 'express';
import {createWarehouse, updateWarehouse, searchWarehouse, getWarehouse} from 'controllers/warehouse';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(searchWarehouse);
router.route('/getWarehouse').get(getWarehouse);
router.route('/').put(updateWarehouse).post(createWarehouse); // bu kısım değişecek

export default router;
