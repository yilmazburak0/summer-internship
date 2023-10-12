import { apiURL, axiosClient } from "service";
import * as actionTypes from "./deliveryTypes";
import { authHeader } from "helpers/auth";

export const fetchDeliveries = (deliveryFilter) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.searchDeliveries, deliveryFilter, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.FETCH_DELIVERIES_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.FETCH_DELIVERIES_ERROR, payload: response.error });
  }
};

export const createDelivery = (delivery) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.createDelivery, delivery, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.CREATE_DELIVERY_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.CREATE_DELIVERY_ERROR, payload: response.error });
  }
};
export const updateDelivery = (delivery) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.put(apiURL.updateDelivery, delivery, authHeader())).data;
  if (!response.error) {
    console.log("hata yok");
    dispatch({ type: actionTypes.UPDATE_DELIVERY_SUCCESS, payload: response });
  } else {
    console.log("hata");
    dispatch({ type: actionTypes.UPDATE_DELIVERY_ERROR, payload: response.error });
  }
};
export const deleteDelivery = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.delete(`${apiURL.deleteDelivery}/${id}`, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.DELETE_DELIVERY_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.DELETE_DELIVERY_ERROR, payload: response.error });
  }
};
export const setNewDelivery = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_NEW_DELIVERY, payload: type });
};
export const toggleCreateEditModal = (open) => async (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_CREATE_EDIT_MODAL, payload: open });
};
export const setModalType = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MODAL_TYPE, payload: type });
};
export const setSelectedDelivery = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SELECTED_DELIVERY, payload: type });
};
