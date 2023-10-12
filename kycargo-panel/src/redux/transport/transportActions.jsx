import { apiURL, axiosClient } from "service";
import * as actionTypes from "./transportTypes";
import { authHeader } from "helpers/auth";

export const fetchTransports = (transportFilter) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.searchTransports, transportFilter, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.FETCH_TRANSPORTS_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.FETCH_TRANSPORTS_ERROR, payload: response.error });
  }
};

export const createTransport = (transport) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.createTransport, transport, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.CREATE_TRANSPORT_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.CREATE_TRANSPORT_ERROR, payload: response.error });
  }
};
export const updateTransport = (transport) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.put(apiURL.updateTransport, transport, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.UPDATE_TRANSPORT_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.UPDATE_TRANSPORT_ERROR, payload: response.error });
  }
};
export const deleteTransport = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.delete(`${apiURL.deleteTransport}/${id}`, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.DELETE_TRANSPORT_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.DELETE_TRANSPORT_ERROR, payload: response.error });
  }
};
export const toggleCreateEditModal = (open) => async (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_CREATE_EDIT_MODAL, payload: open });
};
export const setModalType = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MODAL_TYPE, payload: type });
};
export const setSelectedTransport = (transport) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SELECTED_TRANSPORT, payload: transport });
};
