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
} from "./authTypes";

const INITIAL_STATE = {
    isSignInSuccess: false,
    signInError: '',
    isSignUpSuccess: false,
    signUpError: '',
    user: {},
    menu: null,
    token: '',
    authenticated: false,
}

const authReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SIGN_IN_USER_SUCCESS:
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                isLoading: false,
                isSignInSuccess: true,
                signInError: '',
                authenticated: true,
            };
        case SIGN_IN_ERROR:
            return { ...state, token: null, signInError: payload, authenticated: false };
        case SIGN_UP_USER_SUCCESS:
            return {
                ...state,
                user: payload,
                isLoading: false,
                isSignUpSuccess: true,
                authenticated: true,
            };
        case SIGN_UP_ERROR:
            return { ...state, token: null, signUpError: payload, authenticated: false };
        case SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                token: null,
                authenticated: false,
                isSignInSuccess: false,
                isSignUpSuccess: false,
            };
        case SET_USER:
            return { ...state, user: payload, authenticated: true };
        case RESET_USER:
            return { ...state, user: {}, authenticated: false };
        case SET_MENU_SUCCESS:
            return { ...state, menu: payload.menus, authenticated: true };
        case SET_MENU_ERROR:
            return { ...state, menu: {}, authenticated: false };
        default:
            return state;
    }
};

export default authReducer;
