import { apiURL, axiosClient } from 'service';
import {
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_OUT_USER_SUCCESS,
  SET_USER,
  RESET_USER,
  SET_MENU_SUCCESS,
  SET_MENU_ERROR,
} from './authTypes';
import history from '../../router/history.js';
import { authHeader } from 'helpers/auth';

export const signInUser = (user) => async (dispatch) => {
  const response = (await axiosClient.post(apiURL.signIn, user)).data;

  if (response.success) {
    dispatch({ type: SIGN_IN_USER_SUCCESS, payload: response });
    localStorage.setItem('token', response.token);
    history.push('/');
  } else {
    dispatch({ type: SIGN_IN_ERROR, payload: response.error });
  }
};

export const signUpUser = (user) => async (dispatch) => {
  const response = (await axiosClient.post(apiURL.signUp, user)).data;

  if (response.success) {
    dispatch({ type: SIGN_UP_USER_SUCCESS, payload: response.user });
    localStorage.setItem('token', response.token);
    history.push('/home');
  } else {
    dispatch({ type: SIGN_UP_ERROR, payload: response.error });
  }
};

export const signOut = () => async (dispatch) => {
  dispatch({ type: SIGN_OUT_USER_SUCCESS });
  localStorage.removeItem('token');
  history.push('/auth/login');
};

export const getUser = () => async (dispatch) => {
  const { data } = await axiosClient.get(apiURL.user, authHeader());

  if (data?.email) {
    dispatch({ type: SET_USER, payload: data });
  } else {
    localStorage.removeItem('token');
    history.push('/');
  }
};

export const getMenu = () => async (dispatch) => {
  const response = await axiosClient.post(
    apiURL.getMenu,
    {},
    authHeader()
  );
  if (response.status === 200) {
    dispatch({ type: SET_MENU_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: SET_MENU_ERROR, payload: response });
  }
};

export const pushUser = (user) => async (dispatch) => {
  const { data } = await axiosClient.put(apiURL.user, user, authHeader());

  if (data.email) {
    dispatch({ type: SET_USER, payload: data });
  }
};

export const setUser = (user) => async (dispatch) => {
  dispatch({ type: SET_USER, payload: user });
};

export const resetUser = () => async (dispatch) => {
  dispatch({ type: RESET_USER });
};
