import modalTypes from "enums/modal";
import * as actionTypes from "./productsTypes";
import { findAndDelete, findAndUpdate } from "helpers/array";

const INITIAL_STATE = {
    products: [],
    totalProducts: 0,
    selectedProduct: {},
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
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return { ...state, products: [...payload.data], totalProducts: payload.totalCount, loading: false };
        case actionTypes.FETCH_PRODUCTS_ERROR:
            return { ...state, errorMessage: payload, loading: false };

        case actionTypes.GET_PRODUCTS_SUCCESS:
            return { ...state, products: payload, loading: false };
        case actionTypes.GET_PRODUCTS_ERROR:
            return { ...state, errorMessage: payload, loading: false };   

        case actionTypes.CREATE_PRODUCT_SUCCESS:
            return { ...state, products: [payload, ...state.products], totalProducts: ++state.totalProducts, createEditModalOpen: false, loading: false };
        case actionTypes.CREATE_PRODUCT_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return { ...state, products: [...findAndUpdate(state.products, payload)], createEditModalOpen: false, loading: false };
        case actionTypes.UPDATE_PRODUCT_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return { ...state, products: [...findAndDelete(state.products, payload)], createEditModalOpen: false, loading: false, selectedProduct: {} };
        case actionTypes.DELETE_PRODUCT_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.TOGGLE_CREATE_EDIT_MODAL:
            return { ...state, loading: false, createEditModalOpen: payload };
        case actionTypes.SET_SELECTED_PRODUCT:
            return { ...state, loading: false, selectedProduct: payload };
        case actionTypes.SET_MODAL_TYPE:
            return { ...state, loading: false, createEditModalType: payload };
        default:
            return state;
    }
};

export default customiseReducer;
