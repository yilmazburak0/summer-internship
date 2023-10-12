import express from 'express';
import {getVehicle, createVehicle, updateVehicle, deleteVehicle, searchVehicle} from 'controllers/vehicles';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(searchVehicle);
router.route('/getVehicle').get(getVehicle);
router.route('/:id').delete(deleteVehicle);;
router.route('/').put(updateVehicle).post(createVehicle)

export default router;
// localhost:8052/wapi/v1/vehicles/search