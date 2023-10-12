import express from 'express';
import { getImage, getMergedImage, pdfToUrl, getMultipleBarcodes } from 'controllers/imageApi';
import { protect } from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/getImage').post(getImage);
router.route('/getMergedImage').post(getMergedImage);
router.route('/pdfToUrl').post(pdfToUrl);
router.route('/getMultipleBarcodes').post(getMultipleBarcodes);

export default router;
