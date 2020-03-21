import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* bandVenueSaga() {
    yield takeEvery('GET_THE_BAND', getTheBand);
    yield takeEvery('GET_THE_VENUE', getTheVenue);
}

//gets the current band from DB
function* getTheBand(band){
    console.log("We are here in band GET", band.payload);
    const theBand = yield axios.get(`/api/event/band/${band.payload}`);
    console.log('in saga - band GET back with:', theBand.data);
    yield put({type: 'SET_THE_BAND', payload: theBand.data})
}

//gets the current venue from DB
function* getTheVenue(venue){
    console.log("We are here in venue GET", venue.payload);
    const theVenue = yield axios.get(`/api/event/venue/${venue.payload}`);
    console.log('in saga - venue GET back with:', theVenue.data);
    yield put({type: 'SET_THE_VENUE', payload: theVenue.data})
}



export default bandVenueSaga;