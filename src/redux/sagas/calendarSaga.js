import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* calendarSaga() {
    yield takeEvery('GET_EVENT_LIST', getEventList);
    yield takeEvery('GET_NEW_LIST', getNewList);
    yield takeEvery('GET_MY_CALENDAR', getMyCalendar);
    yield takeEvery('REMOVE_EVENT', removeEvent);
    yield takeEvery('CREATE_NEW_EVENT', createNewEvent);
}

//gets list of all events
function* getEventList(){
    // console.log("We are here in calendar event GET");
    const eventList = yield axios.get('/api/calendar');
    // console.log('in saga - calendar event GET back with:', eventList.data);
    yield put({type: 'SET_EVENT_LIST', payload: eventList.data})
}

//get filtered list of calendar event
function* getNewList(list){
    // console.log("We are here in NEW calendar event GET", list.payload);
    const eventList = yield axios.get(`/api/calendar/new/${list.payload.type}/${list.payload.query}`);
    // console.log('in saga - NEW calendar event GET back with:', eventList.data);
    yield put({type: 'SET_EVENT_LIST', payload: eventList.data})
}

//get personalized calendar from DB
function* getMyCalendar(user){
    // console.log("here in personal calendar event GET", user.payload.id, user.payload.who);
    const eventList = yield axios.get(`/api/calendar/personal/${user.payload.who}/${user.payload.id}`);
    // console.log('in saga - personal calendar GET back with:', eventList.data);
    yield put({type: 'SET_MY_CALENDAR', payload: eventList.data})
}

//remove event from calendar
function* removeEvent(remove) {
    //console.log("in saga event DELETE with: ", remove.payload);
    try {
        yield axios.delete(`/api/calendar/personal/${remove.payload.who}/${remove.payload.id}/${remove.payload.eventId}`);
        yield put({type: 'GET_MY_CALENDAR', payload: remove.payload})
    } catch(error){
        console.log(error);
    }
}

//create new event in calendar
function* createNewEvent(event) {
    // console.log("in saga add event POST with: ", event.payload);
    try {
        yield axios.post(`/api/calendar/add/personal/${event.payload.id}`, event.payload);
        yield put({type: 'GET_MY_CALENDAR', payload: event.payload})
    } catch(error){
        console.log(error);
    }
}

export default calendarSaga;
