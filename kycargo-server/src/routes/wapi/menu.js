import express from 'express';
import {createMenu, getMenu} from 'controllers/menu';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/getMenu').post(getMenu);
router.route('/').post(createMenu);

export default router;
