// In this file, we import all the reducers from all the different files; items, cart, order, auth, and error
// Then combine them using the combineReducers function we got from redux.

import{ combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer
})