import { apiURL, axiosClient } from "service";
import * as actionTypes from "./vehicleTypes";
import { authHeader } from "helpers/auth";

export const fetchVehicles = (vehicleFilter) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.searchVehicles, vehicleFilter, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.FETCH_VEHICLES_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.FETCH_VEHICLES_ERROR, payload: response.error });
  }
};

export const getVehicles = () => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.get(apiURL.getVehicles, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.GET_VEHICLES_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.GET_VEHICLES_ERROR, payload: response.error });
  }
};

export const createVehicle = (vehicle) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.createVehicle, vehicle, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.CREATE_VEHICLE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.CREATE_VEHICLE_ERROR, payload: response.error });
  }
};
export const updateVehicle = (vehicle) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.put(apiURL.updateVehicle, vehicle, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.UPDATE_VEHICLE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.UPDATE_VEHICLE_ERROR, payload: response.error });
  }
};
export const deleteVehicle = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.delete(`${apiURL.deleteVehicle}/${id}`, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.DELETE_VEHICLE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.DELETE_VEHICLE_ERROR, payload: response.error });
  }
};
export const toggleCreateEditModal = (open) => async (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_CREATE_EDIT_MODAL, payload: open });
};
export const setModalType = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MODAL_TYPE, payload: type });
};
export const setSelectedVehicle = (vehicle) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SELECTED_VEHICLE, payload: vehicle });
};
