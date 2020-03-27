import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* genreSaga() {
    yield takeEvery('GET_ALL_GENRES', getAllGenres);
    yield takeEvery('GET_THIS_GENRE', getThisGenre);
    yield takeEvery('GET_EDIT_GENRE', getEditGenre);
    yield takeEvery('NEW_GENRE', newGenre);
}

//gets all genres from DB
function* getAllGenres(){
    console.log("We are here in saga GET all genres");
    const allGenres = yield axios.get(`/api/genre`);
    console.log('in saga - all genres GET back with:', allGenres.data);
    yield put({type: 'SET_ALL_GENRES', payload: allGenres.data})
}

//gets this genre from DB
function* getThisGenre(band){
    console.log("We are here in saga GET this genre");
    const thisGenre = yield axios.get(`/api/genre/${band.payload}`);
    console.log('in saga - this genre GET back with:', thisGenre.data);
    yield put({type: 'SET_THIS_GENRE', payload: thisGenre.data})
}

//gets bands genre for edit from DB
function* getEditGenre(band){
    console.log("We are here in saga GET this band's genre for edit");
    const thisGenre = yield axios.get(`/api/genre/edit/${band.payload}`);
    console.log('in saga - this bands edit genre GET back with:', thisGenre.data);
    yield put({type: 'SET_EDIT_GENRE', payload: thisGenre.data})
}

//adds new genre to list in DB
function* newGenre(genre){
    yield console.log("We are here in new genre POST saga", genre.payload);
    // try {
    //     const newGenre = yield axios.post(`/api/genre`);
    //     console.log('returning from new genre with', newGenre);
    //     yield put({type: 'GET_ALL_GENRES', payload: gnere.payload});
    // } catch(error){
    //     console.log('error in saga new gnere:', error);
    // }
}


export default genreSaga;