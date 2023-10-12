import express from 'express';
import {
  getDelivery,
  getDeliveryByCode,
  getArrivedDeliveryByCode,
  startPreparingDelivery,
  PreparedDelivery,
  shippedDelivery,
  customDeliveryEnterWarehouse,
  deliveryEnterWarehouse,
  acceptProduct,
  deliveryAcceptedByGonderSatalim,
  deliveryAcceptedByCompany,
  deliverySearch,
  deleteFileFromDelivery,
  addFileToDelivery,
  createDelivery,
  changeDeliveryStatus,
} from 'controllers/delivery';
import {protect} from 'middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/changeDeliveryStatus').put(changeDeliveryStatus);
router.route('/search').post(deliverySearch);
router.route('/getDelivery').get(getDelivery);
// router.route('/:id').delete(deleteDelivery);
router.route('/').post(createDelivery);
// router.route('/deliveryAcceptedByCompany').post(deliveryAcceptedByCompany);
// router.route('/deliveryAcceptedByGonderSatalim').post(deliveryAcceptedByGonderSatalim);
// router.route('/acceptProduct').post(acceptProduct);
// router.route('/deliveryEnterWarehouse').post(deliveryEnterWarehouse);
// router.route('/customDeliveryEnterWarehouse').post(customDeliveryEnterWarehouse);
// router.route('/shippedDelivery').post(shippedDelivery);
// router.route('/deleteFileFromDelivery').post(deleteFileFromDelivery);
// router.route('/addFileToDelivery').post(addFileToDelivery);

// router.route('/preparedDelivery').post(PreparedDelivery);
// router.route('/startPreparingDelivery').post(startPreparingDelivery);
// router.route('/getArrivedDeliveryByCode').post(getArrivedDeliveryByCode);
// router.route('/getDeliveryByCode').post(getDeliveryByCode);
// router.route('/:id').get(getDelivery);
export default router;
