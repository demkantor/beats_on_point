import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* photoSaga() {
    yield takeEvery('WANT_YOUR_PICTURE', wantYourPicture);
}


//gets list of quotes
function* wantYourPicture(image){
    yield console.log('in photoSaga post with:', image.payload);
    const config = { headers: {'Content-Type': 'multipart/form-data'} }
    try {
        const photoUp = yield axios.post(`/api/photo/${image.payload.id}`, image.payload.FormData, config);
        console.log('in saga photo post back with res.data', photoUp.data);
    } catch(error){
        console.log('error in saga /photo/POST:', error);
    }
}



export default photoSaga;