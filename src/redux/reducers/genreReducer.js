import { combineReducers } from 'redux';

//store all genres
const allGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GENRES':
            return state = action.payload;
        default:
            return state;
    }
}

//store specific band genre
const bandGenre = (state = [], action) => {
    switch (action.type) {
        case 'SET_THIS_GENRE':
            return state = action.payload;
        default:
            return state;
    }
}

//store band genre for edit
const bandEditGenre = (state = [], action) => {
    switch (action.type) {
        case 'SET_EDIT_GENRE':
            return state = action.payload;
        default:
            return state;
    }
}


export default combineReducers({
    allGenres,
    bandGenre,
    bandEditGenre
  });