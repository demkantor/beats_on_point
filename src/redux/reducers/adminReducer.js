import { combineReducers } from 'redux';

//stores list upon admin request
const listAllReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_LIST':
            return state = action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    listAllReducer
  });