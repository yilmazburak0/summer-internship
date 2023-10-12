import modalTypes from "enums/modal";
import * as actionTypes from "./warehouseTypes";
import { findAndDelete, findAndUpdate } from "helpers/array";

const INITIAL_STATE = {
    warehouses: [],
    totalWarehouseCount: 0,
    selectedWarehouse: {},
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
        case actionTypes.FETCH_WAREHOUSES_SUCCESS:
            return { ...state, warehouses: [...payload.data], totalWarehouseCount: payload.totalCount, loading: false };
        case actionTypes.FETCH_WAREHOUSES_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.GET_WAREHOUSES_SUCCESS:
            return { ...state, warehouses: payload, loading: false };
        case actionTypes.GET_WAREHOUSES_ERROR:
            return { ...state, errorMessage: payload, loading: false };    
        case actionTypes.CREATE_WAREHOUSE_SUCCESS:
            return { ...state, warehouses: [payload, ...state.warehouses], totalWarehouseCount: ++state.totalWarehouseCount, createEditModalOpen: false, loading: false };
        case actionTypes.CREATE_WAREHOUSE_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.UPDATE_WAREHOUSE_SUCCESS:
            return { ...state, warehouses: [...findAndUpdate(state.warehouses, payload)], createEditModalOpen: false, loading: false };
        case actionTypes.UPDATE_WAREHOUSE_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.DELETE_WAREHOUSE_SUCCESS:
            return { ...state, warehouses: [...findAndDelete(state.warehouses, payload)], createEditModalOpen: false, loading: false, selectedWarehouse: {} };
        case actionTypes.DELETE_WAREHOUSE_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.TOGGLE_CREATE_EDIT_MODAL:
            return { ...state, loading: false, createEditModalOpen: payload };
        case actionTypes.SET_SELECTED_WAREHOUSE:
            return { ...state, loading: false, selectedWarehouse: payload };
        case actionTypes.SET_MODAL_TYPE:
            return { ...state, loading: false, createEditModalType: payload };
        default:
            return state;
    }
};

export default customiseReducer;
