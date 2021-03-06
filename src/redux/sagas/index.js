import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import lebowskiSaga from './lebowskiSaga';
import photoSaga from './photoSaga';
import calendarSaga from './calendarSaga';
import bandVenueSaga from './bandVenueSaga';
import profileEditSaga from './profileEditSaga';
import genreSaga from './genreSaga';
import adminSaga from './adminSaga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    lebowskiSaga(),
    photoSaga(),
    calendarSaga(),
    bandVenueSaga(),
    profileEditSaga(),
    genreSaga(),
    adminSaga()
  ]);
}
