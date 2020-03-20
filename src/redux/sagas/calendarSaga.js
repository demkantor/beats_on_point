import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* calendarSaga() {
    yield takeEvery('GET_EVENT_LIST', getEventList);
}

//gets list of quotes
function* getEventList(){
    console.log("We are here in calendar event GET");
    const eventList = yield axios.get('/api/calendar');
    console.log('in saga - calendar event GET back with:', eventList.data);
    yield put({type: 'SET_EVENT_LIST', payload: eventList.data})
}



export default calendarSaga;