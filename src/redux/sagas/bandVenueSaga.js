import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* bandVenueSaga() {
    yield takeEvery('GET_THE_BAND', getTheBand);
    yield takeEvery('GET_THE_VENUE', getTheVenue);
    yield takeEvery('NEW_BAND', newBand);
    yield takeEvery('NEW_VENUE', newVenue);
    yield takeEvery('GET_ALL_BANDS', getAllBands);
    yield takeEvery('GET_ALL_VENUES', getAllVenues);

}

//gets the current band from DB
function* getTheBand(band){
    console.log("We are here in band GET", band.payload);
    const theBand = yield axios.get(`/api/event/band/${band.payload}`);
    console.log('in saga - band GET back with:', theBand.data);
    yield put({type: 'SET_THE_BAND', payload: theBand.data[0]})
}

//gets the current venue from DB
function* getTheVenue(venue){
    console.log("We are here in venue GET", venue.payload);
    const theVenue = yield axios.get(`/api/event/venue/${venue.payload}`);
    console.log('in saga - venue GET back with:', theVenue.data);
    yield put({type: 'SET_THE_VENUE', payload: theVenue.data[0]})
}

//gets all bands from DB
function* getAllBands(){
    console.log("We are here in all bands GET");
    const allBands = yield axios.get(`/api/event/all/bands`);
    console.log('in saga - all bands GET back with:', allBands.data);
    yield put({type: 'SET_ALL_BANDS', payload: allBands.data})
}

//gets all venues from DB
function* getAllVenues(){
    console.log("We are here in venue GET");
    const allVenues = yield axios.get(`/api/event/all/venues`);
    console.log('in saga - venue GET back with:', allVenues.data);
    yield put({type: 'SET_ALL_VENUES', payload: allVenues.data})
}

//unlocks band account for user
function* newBand(band){
    console.log("We are here in new band POST saga", band.payload);
    try {
        const newBand = yield axios.post(`/api/profile/new/band/${band.payload}`);
        console.log('returning from new band with', newBand);
        yield put({type: 'GET_THIS_BAND', payload: band.payload});
        } catch(error){
            console.log('error in saga new band:', error);
        }
}

//unlocks venue account for user
function* newVenue(venue){
    console.log("We are here in new venue POST saga", venue.payload);
    try {
        const newVenue = yield axios.post(`/api/profile/new/venue/${venue.payload}`);
        console.log('returning from new venue with', newVenue);
        yield put({type: 'GET_THIS_VENUE', payload: venue.payload});
        } catch(error){
            console.log('error in saga new venue:', error);
        }
}


export default bandVenueSaga;