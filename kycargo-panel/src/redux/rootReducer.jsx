import { combineReducers } from "redux";

import calendarReducer from "./calendar/calendarReducer";
import contactReducer from "./contact/contactReducer";
import customiseReducer from "./customise/customiseReducer";
import ecommerceReducer from "./ecommerce/ecommerceReducer";
import vehicleReducer from "./vehicle/vehicleReducer";
import packageReducer from "./package/packageReducer";
import authReducer from "./auth/authReducer";
import productsReducer from "./products/productsReducer";
import userReducer from "./user/userReducer";
import countryReducer from "./countries/countryReducer";
import deliveryReducer from "./delivery/deliveryReducer.jsx";
import warehouseReducer from "./warehouse/warehouseReducer";
import transportReducer from "./transport/transportReducer";
const rootReducer = combineReducers({
  calendar: calendarReducer,
  contact: contactReducer,
  ecommerce: ecommerceReducer,
  customise: customiseReducer,
  vehicle: vehicleReducer,
  package: packageReducer,
  products: productsReducer,
  user: userReducer,
  auth: authReducer,
  country: countryReducer,
  delivery: deliveryReducer,
  warehouse:warehouseReducer,
  transport:transportReducer,
});

export default rootReducer;
