import modalTypes from "enums/modal";
import * as actionTypes from "./deliveryTypes";
import { findAndDelete, findAndUpdate } from "helpers/array";

const INITIAL_STATE = {
  deliveries: [],
  totalDeliveryCount: 0,
  newDelivery: {
    packages: [],
    totalPackageCount: 0,
    totalPrice: 0,
  },
  selectedDelivery: {},
  createEditModalType: modalTypes.CREATE,
  loading: false,
  errorMessage: "",
  createEditModalOpen: false,
};

// action =  { type, payload }
const customiseReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: true };
    case actionTypes.FETCH_DELIVERIES_SUCCESS:
      return {
        ...state,
        deliveries: [...payload.data],
        totalDeliveryCount: payload.totalCount,
        loading: false,
      };
    case actionTypes.FETCH_DELIVERIES_ERROR:
      return { ...state, errorMessage: payload, loading: false };
    case actionTypes.CREATE_DELIVERY_SUCCESS:
      return {
        ...state,
        deliveries: [payload, ...state.deliveries],
        totalDeliveryCount: ++state.totalDeliveryCount,
        createEditModalOpen: false,
        loading: false,
      };
    case actionTypes.CREATE_DELIVERY_ERROR:
      return { ...state, errorMessage: payload, loading: false };
    case actionTypes.UPDATE_DELIVERY_SUCCESS:
      return {
        ...state,
        deliveries: [...findAndUpdate(state.deliveries, payload)],
        createEditModalOpen: false,
        loading: false,
      };
    case actionTypes.UPDATE_DELIVERY_ERROR:
      return { ...state, errorMessage: payload, loading: false };
    case actionTypes.DELETE_DELIVERY_SUCCESS:
      return {
        ...state,
        deliveries: [...findAndDelete(state.deliveries, payload)],
        createEditModalOpen: false,
        loading: false,
        selectedDelivery: {},
      };
    case actionTypes.DELETE_DELIVERY_ERROR:
      return { ...state, errorMessage: payload, loading: false };
    case actionTypes.TOGGLE_CREATE_EDIT_MODAL:
      return { ...state, loading: false, createEditModalOpen: payload };
    case actionTypes.SET_NEW_DELIVERY:
      return { ...state, loading: false, newDelivery: payload };
    case actionTypes.SET_SELECTED_DELIVERY:
      return { ...state, loading: false, selectedDelivery: payload };
    case actionTypes.SET_MODAL_TYPE:
      return { ...state, loading: false, createEditModalType: payload };
    default:
      return state;
  }
};

export default customiseReducer;
