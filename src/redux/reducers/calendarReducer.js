import { combineReducers } from 'redux';

//store user photo
const calendarReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_LIST':
            return state = action.payload;
        default:
            return state;
    }
}

const personalCalendar = (state=[], action)=>{
    switch (action.type) {
        case 'SET_MY_CALENDAR':
            return state = action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    calendarReducer,
    personalCalendar
  });