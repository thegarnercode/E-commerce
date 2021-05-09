// In this file, we deal with the reducers related to the orders in our application.

//import all the relevant types for the orders

import {
    GET_ORDERS, // set the orders array to the payload received from the actions file, set the loading to false
    CHECKOUT, // receive new order from the payload and add it to the order array
    ORDERS_LOADING // set loading to true
}
from '.../actions/types';

const initialState = {
    orders: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ORDERS:
            return{
                ...state,
                orders: action.payload,
                loading: false
            }

        case CHECKOUT:
            return{
                ...state,
                orders: [action.payload, ...state.orders]
            }

        case ORDERS_LOADING:
            return{
                ...state,
                loading: true
            }

        default:
            return state;
    }
}