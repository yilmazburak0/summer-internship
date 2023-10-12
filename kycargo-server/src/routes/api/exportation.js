import express from 'express';
import { exportationSearch, getExportation, processedExportation, getExportedProducts } from 'controllers/exportation';
import { apiProtect } from 'middleware/auth';

const router = express.Router();

router.use(apiProtect);
router.route('/search').post(exportationSearch);
router.route('/processedExportation').post(processedExportation);
router.route('/exportedProducts').get(getExportedProducts);
router.route('/:id').get(getExportation);
// router.route('/').post(createProduct);

export default router;
