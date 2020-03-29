import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* adminSaga() {
    yield takeEvery('GET_ALL_ADMIN', getAllAdmin);
   
}

//gets all genres from DB
function* getAllAdmin(type){
    // console.log("We are here in saga GET all Admin");
    const allAdmin = yield axios.get(`/api/admin/${type.payload}`);
    // console.log('in saga - all admin GET back with:', allAdmin.data);
    yield put({type: 'SET_ADMIN_LIST', payload: allAdmin.data})
}


export default adminSaga;