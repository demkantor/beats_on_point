import { combineReducers } from 'redux';

//store logged-in band
const editBandReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_THIS_BAND':
            return state = action.payload;
        default:
            return state;
    }
}

//store logged-in venue
const editVenueReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_THIS_VENUE':
            return state = action.payload;
        default:
            return state;
    }
}



export default combineReducers({
    editBandReducer,
    editVenueReducer,
  });