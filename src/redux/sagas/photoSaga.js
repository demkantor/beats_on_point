import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* photoSaga() {
    yield takeEvery('WANT_YOUR_PICTURE', wantYourPicture);
}


//gets list of quotes
function* wantYourPicture(image){
    yield console.log('in photoSaga PUT with:', image.payload);
    const config = { headers: {'Content-Type': 'multipart/form-data'} }
    try {
        const photoUp = yield axios.put(`/api/photo/${image.payload.id}`, image.payload.pic, config);
        console.log('in saga photo PUT back with res.data', photoUp.data);
    } catch(error){
        console.log('error in saga /photo/PUT:', error);
    }
}



export default photoSaga;