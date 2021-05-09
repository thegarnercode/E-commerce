// import all the types we need for authentication from the types files of the actions folder//
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

// set up initial state where we retrieve the token form the local storage//
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: false
}

export default function(state=initialState, action){
    switch(action.type){
        case USER_LOADING: // user is being loaded
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED: // user is loaded
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload //set user as the payload we received form the actions file//
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: true
            };
        case AUTH_ERROR:// when user suthentication fail
        case LOGIN_FAIL:// user log-in fails
        case LOGOUT_SUCCESS:// user log-out successful
        case REGISTER_FAIL:// user registration fail
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}