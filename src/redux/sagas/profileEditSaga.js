import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* profileEditSaga() {
    yield takeEvery('GET_THIS_BAND', getThisBand);
    yield takeEvery('GET_THIS_VENUE', getThisVenue);
}

//gets the logged-in band from DB
function* getThisBand(band){
    console.log("We are here in band profile GET", band.payload);
    const theBand = yield axios.get(`/api/profile/band/${band.payload}`);
    console.log('in saga - band profile GET back with:', theBand.data);
    yield put({type: 'SET_THIS_BAND', payload: theBand.data})
}

//gets the logged-in venue from DB
function* getThisVenue(venue){
    console.log("We are here in venue profile GET", venue.payload);
    const theVenue = yield axios.get(`/api/profile/venue/${venue.payload}`);
    console.log('in saga - venue profile GET back with:', theVenue.data);
    yield put({type: 'SET_THIS_VENUE', payload: theVenue.data})
}



export default profileEditSaga;