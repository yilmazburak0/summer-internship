import modalTypes from "enums/modal";
import * as actionTypes from "./userTypes";
import { findAndDelete, findAndUpdate } from "helpers/array";

const INITIAL_STATE = {
    users: [],
    totalUserCount: 0,
    selectedUser: {},
    createEditModalType: modalTypes.CREATE,
    loading: false,
    errorMessage: '',
    createEditModalOpen: false
}

// action =  { type, payload }
const customiseReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_LOADING:
            return { ...state, loading: true, };
        case actionTypes.FETCH_USERS_SUCCESS:
            return { ...state, users: [...payload.data], totalUserCount: payload.totalCount, loading: false };
        case actionTypes.FETCH_USERS_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.CREATE_USER_SUCCESS:
            return { ...state, users: [payload, ...state.users], totalUserCount: ++state.totalUserCount, createEditModalOpen: false, loading: false };
        case actionTypes.CREATE_USER_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.UPDATE_USER_SUCCESS:
            return { ...state, users: [...findAndUpdate(state.users, payload)], createEditModalOpen: false, loading: false };
        case actionTypes.UPDATE_USER_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.DELETE_USER_SUCCESS:
            return { ...state, users: [...findAndDelete(state.users, payload)], createEditModalOpen: false, loading: false, selectedUser: {} };
        case actionTypes.DELETE_USER_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.GET_USERS_SUCCESS:
            return { ...state, users: payload, loading: false };
        case actionTypes.GET_USERS_ERROR:
            return { ...state, errorMessage: payload, loading: false };   
        case actionTypes.TOGGLE_CREATE_EDIT_MODAL:
            return { ...state, loading: false, createEditModalOpen: payload };
        case actionTypes.SET_SELECTED_USER:
            return { ...state, loading: false, selectedUser: payload };
        case actionTypes.SET_MODAL_TYPE:
            return { ...state, loading: false, createEditModalType: payload };
        default:
            return state;
    }
};

export default customiseReducer;
