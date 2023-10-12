import express from 'express';
import {getUser, updateUser, deleteUser, searchUser, createApiUser, getApiUser,createCustomer} from 'controllers/user';

const router = express.Router({mergeParams: true});

// const advancedResults = require("../middleware/advancedResults");
import {protect} from 'middleware/auth';

router.use(protect);

router.route('/search').post(searchUser);
router.route('/createApi').post(createCustomer);
router.route('/getApi').post(getApiUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
router.route('/').get(getUser);

export default router;
