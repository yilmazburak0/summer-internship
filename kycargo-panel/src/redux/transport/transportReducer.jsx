import modalTypes from "enums/modal";
import * as actionTypes from "./transportTypes";
import { findAndDelete, findAndUpdate } from "helpers/array";

const INITIAL_STATE = {
    transports: [],
    totalTransportCount: 0,
    selectedTransport: {},
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
        case actionTypes.FETCH_TRANSPORTS_SUCCESS:
            return { ...state, transports: [...payload.data], totalTransportCount: payload.totalCount, loading: false };
        case actionTypes.FETCH_TRANSPORTS_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.CREATE_TRANSPORT_SUCCESS:
            return { ...state, transports: [payload, ...state.transports], totalTransportCount: ++state.totalTransportCount, createEditModalOpen: false, loading: false };
        case actionTypes.CREATE_TRANSPORT_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.UPDATE_TRANSPORT_SUCCESS:
            return { ...state, transports: [...findAndUpdate(state.transports, payload)], createEditModalOpen: false, loading: false };
        case actionTypes.UPDATE_TRANSPORT_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.DELETE_TRANSPORT_SUCCESS:
            return { ...state, transports: [...findAndDelete(state.transports, payload)], createEditModalOpen: false, loading: false, selectedTransport: {} };
        case actionTypes.DELETE_TRANSPORT_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.TOGGLE_CREATE_EDIT_MODAL:
            return { ...state, loading: false, createEditModalOpen: payload };
        case actionTypes.SET_SELECTED_TRANSPORT:
            return { ...state, loading: false, selectedTransport: payload };
        case actionTypes.SET_MODAL_TYPE:
            return { ...state, loading: false, createEditModalType: payload };
        default:
            return state;
    }
};

export default customiseReducer;
