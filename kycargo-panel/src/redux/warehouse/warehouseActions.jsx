import { apiURL, axiosClient } from "service";
import * as actionTypes from "./warehouseTypes";
import { authHeader } from "helpers/auth";

export const fetchWarehouses = (vehicleFilter) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.searchWarehouses, vehicleFilter, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.FETCH_WAREHOUSES_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.FETCH_WAREHOUSES_ERROR, payload: response.error });
  }
};

export const getWarehouses = () => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.get(apiURL.getWarehouse, authHeader())).data;
  if (!response.error) {
    dispatch({ type: actionTypes.GET_WAREHOUSES_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.GET_WAREHOUSES_ERROR, payload: response.error });
  }
};

export const createWarehouse = (vehicle) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.createWarehouse, vehicle, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.CREATE_WAREHOUSE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.CREATE_WAREHOUSE_ERROR, payload: response.error });
  }
};
export const updateWarehouse = (vehicle) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.put(apiURL.updateWarehouse, vehicle, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.UPDATE_WAREHOUSE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.UPDATE_WAREHOUSE_ERROR, payload: response.error });
  }
};
export const deleteWarehouse = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.delete(`${apiURL.deleteWarehouse}/${id}`, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.DELETE_WAREHOUSE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.DELETE_WAREHOUSE_ERROR, payload: response.error });
  }
};
export const toggleCreateEditModal = (open) => async (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_CREATE_EDIT_MODAL, payload: open });
};
export const setModalType = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MODAL_TYPE, payload: type });
};
export const setSelectedWarehouse = (vehicle) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SELECTED_WAREHOUSE, payload: vehicle });
};
