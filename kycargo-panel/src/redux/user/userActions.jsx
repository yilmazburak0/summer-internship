import { apiURL, axiosClient } from "service";
import * as actionTypes from "./userTypes";
import { authHeader } from "helpers/auth";

export const fetchUsers = (userFilter) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.searchUsers, userFilter, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.FETCH_USERS_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.FETCH_USERS_ERROR, payload: response.error });
  }
};

export const createUser = (user) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.createUser, user, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.CREATE_USER_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.CREATE_USER_ERROR, payload: response.error });
  }
};
export const updateUser = (user) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.put(apiURL.updateUser, user, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.UPDATE_USER_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.UPDATE_USER_ERROR, payload: response.error });
  }
};
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.delete(`${apiURL.deleteUser}/${id}`, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.DELETE_USER_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.DELETE_USER_ERROR, payload: response.error });
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.get(apiURL.getUsers, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.GET_USERS_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.GET_USERS_ERROR, payload: response.error });
  }
};
export const toggleCreateEditModal = (open) => async (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_CREATE_EDIT_MODAL, payload: open });
};
export const setModalType = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MODAL_TYPE, payload: type });
};
export const setSelectedUser = (pack) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SELECTED_USER, payload: pack });
};
