import { apiURL, axiosClient } from "service";
import * as actionTypes from "./packageTypes";
import { authHeader } from "helpers/auth";

export const fetchPackage = (packageFilter) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.searchPackages, packageFilter, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.FETCH_PACKAGE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.FETCH_PACKAGE_ERROR, payload: response.error });
  }
};

export const getPackages = () => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.get(apiURL.getPackages, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.GET_PACKAGES_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.GET_PACKAGES_ERROR, payload: response.error });
  }
};

export const createPackage = (pack) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.createPackage, pack, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.CREATE_PACKAGE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.CREATE_PACKAGE_ERROR, payload: response.error });
  }
};
export const updatePackage = (pack) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.put(apiURL.updatePackage, pack, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.UPDATE_PACKAGE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.UPDATE_PACKAGE_ERROR, payload: response.error });
  }
};
export const deletePackage = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.delete(`${apiURL.deletePackage}/${id}`, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.DELETE_PACKAGE_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.DELETE_PACKAGE_ERROR, payload: response.error });
  }
};
export const toggleCreateEditModal = (open) => async (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_CREATE_EDIT_MODAL, payload: open });
};
export const setModalType = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MODAL_TYPE, payload: type });
};
export const setSelectedPackage = (pack) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SELECTED_PACKAGE, payload: pack });
};
