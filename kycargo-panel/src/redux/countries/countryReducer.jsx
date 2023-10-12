import modalTypes from "enums/modal";
import * as actionTypes from "./countryTypes";
import { findAndDelete, findAndUpdate } from "helpers/array";

const INITIAL_STATE = {
    countries: [],
    euCountries: [],
    totalCountryCount: 0,
    selectedCountry: {},
    loading: false,
    errorMessage: '',
    // createEditModalOpen: false
}

// action =  { type, payload }
const customiseReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_LOADING:
            return { ...state, loading: true, };
        case actionTypes.FETCH_COUNTRIES_SUCCESS:
            return { ...state, countries: [...payload.data], totalCountryCount: payload.totalCount, loading: false };
        case actionTypes.FETCH_COUNTRIES_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.GET_EU_COUNTRIES_SUCCESS:
            return { ...state, euCountries: payload, loading: false };
        case actionTypes.GET_EU_COUNTRIES_ERROR:
            return { ...state, errorMessage: payload, loading: false };
        case actionTypes.SET_SELECTED_COUNTRY:
            return { ...state, loading: false, selectedCountry: payload };
        // case actionTypes.CREATE_VEHICLE_SUCCESS:
        //     return { ...state, vehicles: [payload, ...state.vehicles], totalVehicleCount: ++state.totalVehicleCount, createEditModalOpen: false, loading: false };
        // case actionTypes.CREATE_VEHICLE_ERROR:
        //     return { ...state, errorMessage: payload, loading: false };
        // case actionTypes.UPDATE_VEHICLE_SUCCESS:
        //     return { ...state, vehicles: [...findAndUpdate(state.vehicles, payload)], createEditModalOpen: false, loading: false };
        // case actionTypes.UPDATE_VEHICLE_ERROR:
        //     return { ...state, errorMessage: payload, loading: false };
        // case actionTypes.DELETE_VEHICLE_SUCCESS:
        //     return { ...state, vehicles: [...findAndDelete(state.vehicles, payload)], createEditModalOpen: false, loading: false, selectedVehicle: {} };
        // case actionTypes.DELETE_VEHICLE_ERROR:
        //     return { ...state, errorMessage: payload, loading: false };
        // case actionTypes.TOGGLE_CREATE_EDIT_MODAL:
        //     return { ...state, loading: false, createEditModalOpen: payload };
        // case actionTypes.SET_SELECTED_VEHICLE:
        //     return { ...state, loading: false, selectedVehicle: payload };
        // case actionTypes.SET_MODAL_TYPE:
        //     return { ...state, loading: false, createEditModalType: payload };
        default:
            return state;
    }
};

export default customiseReducer;
