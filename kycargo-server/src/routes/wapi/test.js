import express from 'express';
import { excelUp } from 'controllers/test';
import { protect } from 'middleware/auth';

const router = express.Router();

//router.use(protect);
router.route('/excelup').get(excelUp);


export default router;
