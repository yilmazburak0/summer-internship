import express from 'express';
import {getPackage, createPackage, updatePackage, deletePackage, searchPackage, changePackageStatus} from 'controllers/package';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/changePackageStatus').post(changePackageStatus);
router.route('/getPackage').get(getPackage);
router.route('/search').post(searchPackage);
router.route('/:id').delete(deletePackage);
router.route('/').put(updatePackage).post(createPackage);

export default router;