import express from 'express';
import { initCountry, getCountry, searchCountry, getEUCountries } from 'controllers/country';
import { protect } from 'middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/search').post(searchCountry);
router.route('/getEUCountries').get(getEUCountries);

//router.route('/init').get(initCountry);
router.route('/:id').get(getCountry);

export default router;
