import modalTypes from "enums/modal";
import * as actionTypes from "./packageTypes";
import { findAndDelete, findAndUpdate } from "helpers/array";

const INITIAL_STATE = {
    packages: [],
    totalPackageCount: 0,
    selectedPackage: {},
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
        case actionTypes.FETCH_PACKAGE_SUCCESS:
            return { ...state, packages: [...payload.data], totalPackageCount: payload.totalCount, loading: false };
        case actionTypes.FETCH_PACKAGE_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        
        case actionTypes.GET_PACKAGES_SUCCESS:
            return { ...state, packages: payload, loading: false };
        case actionTypes.GET_PACKAGES_ERROR:
            return { ...state, errorMessage: payload, loading: false };    

        case actionTypes.CREATE_PACKAGE_SUCCESS:
            return { ...state, packages: [payload, ...state.packages], totalPackageCount: ++state.totalPackageCount, createEditModalOpen: false, loading: false };
        case actionTypes.CREATE_PACKAGE_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.UPDATE_PACKAGE_SUCCESS:
            return { ...state, packages: [...findAndUpdate(state.packages, payload)], createEditModalOpen: false, loading: false };
        case actionTypes.UPDATE_PACKAGE_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.DELETE_PACKAGE_SUCCESS:
            return { ...state, packages: [...findAndDelete(state.packages, payload)], createEditModalOpen: false, loading: false, selectedPackage: {} };
        case actionTypes.DELETE_PACKAGE_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.TOGGLE_CREATE_EDIT_MODAL:
            return { ...state, loading: false, createEditModalOpen: payload };
        case actionTypes.SET_SELECTED_PACKAGE:
            return { ...state, loading: false, selectedPackage: payload };
        case actionTypes.SET_MODAL_TYPE:
            return { ...state, loading: false, createEditModalType: payload };
        default:
            return state;
    }
};

export default customiseReducer;
