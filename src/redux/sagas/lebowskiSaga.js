import axios from 'axios'
import {takeEvery, put} from "redux-saga/effects";


// these sagas take the dispatch and runs them before they get to the reducers
function* lebowskiSaga() {
    yield takeEvery('NOBODY_FUCKS_WITH_THE_JESUS', nobdyFucksWithTheJesus);
}

//gets list of quotes
function* nobdyFucksWithTheJesus(){
    console.log(	"Come on, Walter, we're ending this thing cheap.");
    const quoteList = yield axios.get('http://lebowski.me/api/quotes/random');
    console.log('in saga - get leboswki with:', quoteList.data.quote.lines);
    yield put({type: 'I_AM_THE_WALRUS', payload: quoteList.data})
}



export default lebowskiSaga;