import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* photoSaga() {
    yield takeEvery('WANT_YOUR_PICTURE', wantYourPicture);
    yield takeEvery('GET_YOUR_PICTURE', getYourPicture);
}


//gets DB stored image
function* getYourPicture(id){
    const userImage = yield axios.get(`/api/photo/${id.payload}`);
    yield put({type: 'GOT_YOUR_PICTURE', payload: userImage.data});
}

//updates user photo in DB
function* wantYourPicture(image){
    const config = { headers: {'Content-Type': 'multipart/form-data'} }
    try {
        const photoUp = yield axios.put(`/api/photo/${image.payload.user.id}/${image.payload.user.band}/${image.payload.user.venue}`, image.payload.pic, config);
        console.log('returning from photo put with', photoUp);
        yield put({type: 'GET_YOUR_PICTURE', payload: image.payload.user.id});
    } catch(error){
        console.log('error in saga /photo/PUT:', error);
    }
}



export default photoSaga;