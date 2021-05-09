// in this file , we deal with reducers related to the acrt of the user 

import{
    GET_CART,// receive the cart throught the payload from actions file
    ADD_TO_CART,// get the updated cart , set the cart to the payload received from actions
    DELETE_FROM_CART,// get the updated cart , set the cart to the payload received from actions
    CART_LOADING// set the loading to true 
}
from '.../actions/types';

// Define the initial state of the cart //

const initialState = {
    cart: null,
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_CART:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: action.payload,
            }
        case DELETE_FROM_CART:
            return {
                ...state,
                cart: action.payload,
            }
        case CART_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}