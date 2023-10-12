import { apiURL, axiosClient } from "service";
import * as actionTypes from "./productsTypes";
import { authHeader } from "helpers/auth";

export const fetchProducts = (productsFilter) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.searchProducts, productsFilter, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_ERROR, payload: response.error });
  }
};
export const getProducts = () => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.get(apiURL.getProducts, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.GET_PRODUCTS_ERROR, payload: response.error });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.post(apiURL.createProduct, product, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.CREATE_PRODUCT_ERROR, payload: response.error });
  }
};
export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.put(apiURL.updateProduct, product, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.UPDATE_PRODUCT_ERROR, payload: response.error });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });
  const response = (await axiosClient.delete(`${apiURL.deleteProduct}/${id}`, authHeader())).data;

  if (!response.error) {
    dispatch({ type: actionTypes.DELETE_PRODUCT_SUCCESS, payload: response });
  } else {
    dispatch({ type: actionTypes.DELETE_PRODUCT_ERROR, payload: response.error });
  }
};
export const toggleCreateEditModal = (open) => async (dispatch) => {
  dispatch({ type: actionTypes.TOGGLE_CREATE_EDIT_MODAL, payload: open });
};
export const setModalType = (type) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_MODAL_TYPE, payload: type });
};
export const setSelectedProduct = (product) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_SELECTED_PRODUCT, payload: product });
};
