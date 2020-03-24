import { combineReducers } from 'redux';

//store current band
const bandReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_THE_BAND':
            return state = action.payload;
        default:
            return state;
    }
}

//store current venue
const venueReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_THE_VENUE':
            return state = action.payload;
        default:
            return state;
    }
}

//stores all bands
const allBands =(state =[], action)=>{
    switch (action.type) {
        case 'SET_ALL_BANDS':
            return state = action.payload;
        default:
            return state;
    }
}
//stores all venues
const allVenues =(state =[], action)=>{
    switch (action.type) {
        case 'SET_ALL_VENUES':
            return state = action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    bandReducer,
    venueReducer,
    allBands,
    allVenues
  });