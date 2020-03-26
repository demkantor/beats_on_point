import { combineReducers } from 'redux';

//stores calendar event list
const calendarReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENT_LIST':
            return state = action.payload;
        default:
            return state;
    }
}

// stores personal calendar events
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