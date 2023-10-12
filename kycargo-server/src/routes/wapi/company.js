import express from 'express';
import {getCompany, createCompany, updateCompany, deleteCompany, searchCompany} from 'controllers/company';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(searchCompany);
router.route('/:id').get(getCompany).delete(deleteCompany);
router.route('/').put(updateCompany).post(createCompany);

export default router;