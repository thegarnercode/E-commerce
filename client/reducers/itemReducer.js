import {
    GET_ITEMS,// reducer for getting items
    ADD_ITEMS,// we call our state using the spread operator and then add new item received from the payload
    UPDATE_ITEM,//get id and the ipdated item from the payload, take the item from the array an remove the item whose id matches by filtering
    DELETE_ITEM,// get id and updated item from payload, find the items array using its id and then update it with the new item 
    ITEMS_LOADING // Set the loading to true to signify that items are loading.
}
from '../actions/types';

const initialState = {
    items: [],
    loading: false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items: action.payload,
                loading: false
            }
            case ADD_ITEM:
                return{
                    ...state,
                    items: [action.payload, ...state.items]
                }
            case DELETE_ITEM:
                return{
                    ...state,
                    items: state.items.filter(item => item._id!==action.payload)
                };

            case UPDATE_ITEM:
                return{
                    ...state,
                    items: state.items.map(item => {
                        if(item._id===id){
                            item = data;
                        }
                    })
                } 
            case ITEMS_LOADING:
                return{
                    ...state,
                    loading: true
                }   

                default:
                    return state;

                }
    }
